export const dynamic = 'force-dynamic';

import React from 'react';
import wp from "../../../../public/img/wp1.jpg"

import Image from 'next/image';
import Link from 'next/link';
import HTMLReactParser from 'html-react-parser';



// Function to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export default async function NewsDets(props) {
    const { params } = props;
    const awaitedParams = await params;
    const id = awaitedParams.id;

    let blog = null;
    let otherBlogs = [];
    try {
        // Fetch the specific blog
        const blogApiUrl = `${process.env.BASE_API}/api/admin/blog/${id}`;
        const blogResponse = await fetch(blogApiUrl, {
            cache: "no-store"
        });
        
        if (!blogResponse.ok) {
          return <div>Error fetching blog data</div>;
        }
        let resp  = await blogResponse.json();
        blog = resp?.data?.[0];
        
        // console.log(blog)
        // Fetch all blogs for "Other Blogs" section
        const allBlogsApiUrl = `${process.env.BASE_API}/api/admin/blog/`;
        const allBlogsResponse = await fetch(allBlogsApiUrl, {
            cache: "no-store"
        });

        if (allBlogsResponse.ok) {
            const allBlogsData = await allBlogsResponse.json();
            // Filter out current blog and get other blogs
            if (Array.isArray(allBlogsData)) {
                otherBlogs = allBlogsData.filter(b => b.id !== parseInt(id)).slice(0, 3);
            } else if (allBlogsData.data && Array.isArray(allBlogsData.data)) {
                otherBlogs = allBlogsData.data.filter(b => b.id !== parseInt(id)).slice(0, 3);
            }
        }
    } catch (error) {
        console.error("Error fetching blog data:", error);
        // You might want to redirect to 404 or show error page
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
                    <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist.</p>
                    <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                        Go back to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">This Specific Blog Not Found</h1>
                    <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist.</p>
                    <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                        Go back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const backgroundImage = blog.coverImage 
        ? `${process.env.BASE_CONTENT_URL}/${blog.coverImage}`
        : wp;

    return (
        <>
            {/* <Navbar></Navbar> */}
            <div className="min-h-[100vh] flex items-end justify-center relative overflow-hidden bg-gray-100">
                
                {/* Background Image and Overlay Container */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        {/* Dark Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    </div>
                </div>

                {/* Content Container (z-10 for stacking above the background) */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 m-auto">

                    {/* Main Text Content */}
                    <div className="text-center flex flex-col justify-around mb-12">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
                            {blog.title ?? " "}
                        </h1>
                        
                        {/* Author and Date Info */}
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-200">
                            {blog.author_name && (
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">By {blog.author_name}</span>
                                </div>
                            )}
                            {blog.created_at && (
                                <div className="flex items-center gap-2">
                                    <span className="opacity-75">•</span>
                                    <span>{formatDate(blog.created_at)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            
            {/* ------------------------------------- */}
            <div className="min-h-screen py-12 sm:py-16 md:py-20 bg-[#e9e9e9]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Responsive Grid Container */}
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
                        
                        {/* Column 1: Main Content (Takes up 2/3 of the width on medium/large screens) */}
                        <div className="md:col-span-2 mb-10 md:mb-0">
                            <NewsStudy blog={blog} />
                        </div>

                        {/* Column 2: Newsletter Sidebar (Takes up 1/3 of the width on medium/large screens) */}
                        <div className="md:col-span-1">
                            {/* <NewsletterSidebar /> */}
                        </div>

                    </div>
                </div>
            </div> 

            {/* Other Blogs Section */}
            {otherBlogs?.length > 0 && (
                <div>
                    <div className='max-w-7xl mx-auto mt-8 mb-8 flex gap-4 justify-between'>
                        <h1 className='text-xl ml-3 font-semibold'>Other Blogs</h1>
                    </div>
                    <div style={{justifyItems:"center"}} className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white">
                        {otherBlogs?.map((blogItem, index) => (
                            <div key={blogItem.id || index} className="bg-white max-w-[400px] min-w-[400px] justify-between rounded-2xl rounded-br-[95px] shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col h-full">
                                {/* Image Container */}
                                <div className="w-full h-auto overflow-hidden p-4">
                                    <Image
                                        width={300}
                                        height={300}
                                        src={`${process.env.NEXT_PUBLIC_BASE_CONTENT_URL}/${blogItem.coverImage}`}
                                        alt={blogItem.title ?? " "}
                                        className="w-[100%] h-[200px] object-cover transition duration-500 ease-in-out hover:scale-[1.03]"
                                        unoptimized
                                    />
                                </div>
                                
                                {/* Content Area */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-semibold text-gray-800 leading-snug mb-3">
                                        {blogItem.title ?? " "}
                                    </h3>
                                    
                                    {/* Author and Date for Other Blogs */}
                                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                                        {blogItem.author_name && (
                                            <span className="font-medium">By {blogItem.author_name}</span>
                                        )}
                                        {blogItem.created_at && (
                                            <>
                                                <span className="opacity-50">•</span>
                                                <span>{formatDate(blogItem.created_at)}</span>
                                            </>
                                        )}
                                    </div>
                                    
                                    <div className="text-base multiline-ellipsis text-gray-600 mb-4 flex-grow">
                                        {HTMLReactParser(
                                            blogItem.content 
                                                ? blogItem.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                                                : ''
                                        )}
                                    </div>
                                    <Link href={`/blog/${blogItem.id}`} className="text-blue-600 font-medium hover:text-blue-700 transition duration-150 self-start">
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* <Footer></Footer> */}
        </>
    );
}


// Main Case Study Content Component
const NewsStudy = ({ blog }) => {
    return (
        <>
            <div className="text-gray-700 leading-relaxed space-y-8">
                <section>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                        {blog.title || null}
                    </h2>
                    
                    {/* Author and Date in Content Section */}
                    <div className="flex items-center gap-4 mb-6 text-gray-600">
                        {blog.author_name && (
                            <div className="flex items-center gap-2">
                                <span className="font-medium">By {blog.author_name}</span>
                            </div>
                        )}
                        {blog.created_at && (
                            <div className="flex items-center gap-2">
                                <span className="opacity-50">•</span>
                                <span>{formatDate(blog.created_at)}</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Blog Content with HTML parsing */}
                    <div className="prose prose-lg max-w-none text-lg font-semibold">
                        {HTMLReactParser(blog.content || '')}
                    </div>
                </section>
            </div>
        </>
    );
};