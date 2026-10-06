import Hero from '@/pages/landing/Hero'
import TechnicalSpecification from '@/pages/landing/about/TechnicalSpecification'
import React from 'react'
import ProjectTeam from '@/pages/landing/ProjectTeam'

import WaterToWireSystem from '@/pages/landing/WaterToWire'
import FinancialOverview from '@/pages/landing/FinancialOverview'
import TeamSection from '@/pages/landing/team/Team'
import GalleryClient from '@/pages/landing/gallery/GalleryClient'
import GalleryPage from '@/pages/landing/gallery/page'
import NewsEventsSection from '@/pages/landing/blog/page'
import ProjectOverviewSection from '@/pages/landing/projectOverview/page'
import WaterToWireSection from '@/pages/landing/waterToWire/WaterToWire'
import ContactSection from '@/pages/contact/ContactSection'
import FaqSection from '@/pages/faq/FaqSection'
import PreFooterCTA from '@/pages/landing/PreFooterCTA/PreFooterCTA'
import Footer from '@/pages/landing/footer/Footer'

const page = async () => {
const BASE_API = process.env.BASE_API;
let data = null;


  try {
      const res = await fetch(`${BASE_API}/api/admin/misc`)
      const json = await res.json()
      data = json?.data?.[0]
  } catch (error) {
    return <div className='text-[19px] text-center p-[12px] heroSection'>Some Content Could Not be Loaded. </div>
  }

// console.log(data, "footerData")
  return (
   <>
   <Hero footerData={data}></Hero>  
   <TechnicalSpecification footerData={data}></TechnicalSpecification>
   <TeamSection data={data}></TeamSection>


   <ProjectOverviewSection></ProjectOverviewSection>
   <WaterToWireSection footerData={data}></WaterToWireSection>
   <ContactSection data={data}></ContactSection>
      <GalleryPage></GalleryPage>
   <FaqSection></FaqSection>
      <NewsEventsSection data={data}></NewsEventsSection>
   <PreFooterCTA  data={data}></PreFooterCTA>
   <Footer data={data}></Footer>
   {/* <TeamSection></TeamSection>
   <ProjectTeam></ProjectTeam>
 <TechnicalSpecifications></TechnicalSpecifications>
  <WaterToWireSystem></WaterToWireSystem> 
    <FinancialOverview></FinancialOverview>  */}
   </>
  )
}


export default page