'use client';

import { setIsAddOpened } from '@/app/(bid)/redux/slices/activitySlice';
import Modal from '@/components/adminComponents/modal/Modal';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadBox from './UploadBox';
import { FaUserEdit } from 'react-icons/fa';

/**

 * Props:
 *  - bidId          (number|string) shown in the eyebrow
 *  - data            array of question objects, shape:
 *      { id, title, file, bidId, createdAt, isAnswered, answer }
 *  - onReply(id)     called when the user clicks "Reply" on a pending question
 *  - fileBaseUrl     prefix used to build the attachment link (default '/uploads/')
 */
export default function RequotedQuestionsListWIthAns({ bidId, data = [], fileBaseUrl}) {
  const [pendingClick, setPendingClick] = useState(null);
const isAddOpened = useSelector((state) => state?.activity?.isAddOpened);
const dispatch = useDispatch()

const [selectedReproposeId, setSelectedReproposeId] = useState(null)


  const { answeredCount, pendingCount, sorted } = useMemo(() => {
    const sorted = [...data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const answeredCount = sorted.filter((q) => q.isAnswered).length;
    return { answeredCount, pendingCount: sorted.length - answeredCount, sorted };
  }, [data]);


//   -------------------
  const handleReply = async (id) => {
    try {
      setPendingClick(id);
        setSelectedReproposeId(id)
        dispatch(setIsAddOpened(true))
    } finally {
      setPendingClick(null);
    }
  };
// console.log(selectedReproposeId, "ACTIVE ")
  return (
    <div className="register">


{
    isAddOpened &&
          <Modal
        isModalOpen={isAddOpened}
        onClose={
            () => {
                setSelectedReproposeId(null)
              dispatch(setIsAddOpened(false))
              }
            }
        icon={<FaUserEdit />}
        title="Select File"
        // description="You can Only Update Role of a User."
      >
<UploadBox selectedReproposeId={selectedReproposeId} bidId={bidId}></UploadBox>
      </Modal>
}

      <header className="register__head">
        <span className="register__eyebrow">Bid · Clarifications</span>
        <h2 className="register__title">Requoted Questions</h2>
        <p className="register__summary">
          <span className="dot dot--amber" />
          {pendingCount} awaiting reply
          <span className="register__sep">·</span>
          <span className="dot dot--green" />
          {answeredCount} answered
        </p>
      </header>

      {sorted.length === 0 ? (
        <div className="empty">
          <p>No requoted questions on this bid yet.</p>
        </div>
      ) : (
        <ol className="thread">
          {sorted.map((q, i) => (
            <li
              key={q.id}
              className="entry"
              style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
            >
              <div className="entry__rail">
                <span className={`entry__tag ${q.isAnswered ? 'is-answered' : 'is-pending'}`}>
                  Q- {i+1}
                </span>
                <span className="entry__line" aria-hidden="true" />
              </div>

              <div className="entry__body">
                <div className="entry__top">
                  <span className={`status ${q.isAnswered ? 'status--answered' : 'status--pending'}`}>
                    <span className="status__dot" />
                    {q.isAnswered ? 'Answered' : 'Awaiting your reply'}
                  </span>
                  <time className="entry__date" dateTime={q.createdAt}>
                    {formatDate(q.createdAt)}
                  </time>
                </div>

                <p className="entry__title">
                  {q.title?.trim() ? q.title : <em>Untitled question</em>}
                </p>

                <Attachment file={q.file} fileBaseUrl={fileBaseUrl} label="Question document" />

                {q?.isAnswered && q?.answer ? (
                  <div className="answer">
                    <span className="answer__label">Your reply</span>
                    <Attachment file={q?.file} fileBaseUrl={fileBaseUrl} label="Reply document" />
                    {q.answer.createdAt && (
                      <time className="answer__date" dateTime={q.answer.createdAt}>
                        Submitted {formatDate(q.answer.createdAt)}
                      </time>
                    )}
                  </div>
                ) : null}

                <div className="entry__action">
                  {q.isAnswered ? (
                    <button className="btn btn--done" disabled>
                      <CheckIcon /> Already answered
                    </button>
                  ) : (
                    <button
                      className="btn btn--reply"
                      onClick={() => handleReply(q.id)}
                      disabled={pendingClick === q.id}
                    >
                      {pendingClick === q.id ? 'Sending…' : (
                        <>Reply <ArrowIcon /></>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}

      <style jsx>{`
        .register {
          --bg: #f6f7f9;
          --surface: #ffffff;
          --border: #e4e7ee;
          --ink: #12172b;
          --ink-soft: #646b7d;
          --navy: #1f2a44;
          --amber: #b45309;
          --amber-bg: #fff6e5;
          --green: #157347;
          --green-bg: #e9f9ef;

          max-width: 90%;
          margin: 0 auto;
          padding: 2.5rem 1.25rem 4rem;
          font-family: Inter, system-ui, -apple-system, sans-serif;
          color: var(--ink);
        }

        .register__head {
          margin-bottom: 2rem;
        }

        .register__eyebrow {
          display: inline-block;
          font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--navy);
          background: #eef1f7;
          border: 1px solid var(--border);
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          margin-bottom: 0.9rem;
        }

        .register__title {
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin: 0 0 0.4rem;
        }

        .register__summary {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.88rem;
          color: var(--ink-soft);
          margin: 0;
        }

        .register__sep {
          color: var(--border);
          margin: 0 0.1rem;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
        }
        .dot--amber { background: var(--amber); }
        .dot--green { background: var(--green); }

        .empty {
          border: 1px dashed var(--border);
          border-radius: 10px;
          padding: 2.5rem 1rem;
          text-align: center;
          color: var(--ink-soft);
          font-size: 0.92rem;
        }

        .thread {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .entry {
          display: flex;
          gap: 0.9rem;
          opacity: 0;
          animation: rise 0.4s ease forwards;
        }

        @keyframes rise {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .entry { animation: none; opacity: 1; }
        }

        .entry__rail {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 52px;
          flex-shrink: 0;
        }

        .entry__tag {
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.3rem 0.4rem;
          border-radius: 5px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--ink-soft);
          white-space: nowrap;
        }
        .entry__tag.is-answered {
          border-color: #bfe6cf;
          color: var(--green);
          background: var(--green-bg);
        }
        .entry__tag.is-pending {
          border-color: #f3d9a6;
          color: var(--amber);
          background: var(--amber-bg);
        }

        .entry__line {
          flex: 1;
          width: 1px;
          background: var(--border);
          margin: 0.5rem 0;
        }
        .entry:last-child .entry__line { display: none; }

        .entry__body {
          flex: 1;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.1rem 1.15rem 1.15rem;
          margin-bottom: 1.1rem;
          min-width: 0;
        }

        .entry__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.55rem;
        }

        .status {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 600;
        }
        .status--pending { color: var(--amber); }
        .status--answered { color: var(--green); }
        .status__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .entry__date {
          font-size: 0.75rem;
          color: var(--ink-soft);
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          white-space: nowrap;
        }

        .entry__title {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.45;
          margin: 0 0 0.7rem;
          word-break: break-word;
        }
        .entry__title em { color: var(--ink-soft); font-style: italic; }

        .answer {
          margin-top: 0.7rem;
          padding: 0.75rem 0.85rem;
          background: var(--green-bg);
          border: 1px solid #bfe6cf;
          border-radius: 8px;
        }
        .answer__label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--green);
          margin-bottom: 0.4rem;
        }
        .answer__date {
          display: block;
          font-size: 0.72rem;
          color: var(--ink-soft);
          margin-top: 0.4rem;
        }

        .entry__action {
          margin-top: 0.85rem;
          display: flex;
          justify-content: flex-end;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.5rem 0.9rem;
          border-radius: 7px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: transform 0.12s ease, background 0.15s ease, box-shadow 0.15s ease;
          font-family: inherit;
        }
        .btn:focus-visible {
          outline: 2px solid var(--navy);
          outline-offset: 2px;
        }

        .btn--reply {
          background: var(--navy);
          color: #fff;
        }
        .btn--reply:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(31, 42, 68, 0.25);
        }
        .btn--reply:disabled { opacity: 0.6; cursor: default; }

        .btn--done {
          background: var(--green-bg);
          color: var(--green);
          border-color: #bfe6cf;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .register { padding: 1.75rem 0.9rem 3rem; }
          .entry__rail { width: 40px; }
          .entry__top { flex-direction: column; align-items: flex-start; gap: 0.3rem; }
        }
      `}</style>
    </div>
  );
}

function Attachment({ file, fileBaseUrl, label }) {
  if (!file) {
    return <p className="attachment attachment--empty">No attachment</p>;
  }
  const name = file.split('/').pop();
  return (
    <a
      className="attachment"
      href={`${fileBaseUrl}/${file}`}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
    >
      <FileIcon />
      <span className="attachment__name">{"Document"}</span>
      <style jsx>{`
        .attachment {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: #2b3550;
          background: #f2f4f8;
          border: 1px solid #e4e7ee;
          border-radius: 7px;
          padding: 0.35rem 0.6rem;
          text-decoration: none;
          max-width: 100%;
        }
        .attachment:hover { background: #e9ecf3; }
        .attachment__name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .attachment--empty {
          color: #9aa1b3;
          font-size: 0.8rem;
          font-style: italic;
          margin: 0;
        }
      `}</style>
    </a>
  );
}

function formatDate(iso) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso));
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}