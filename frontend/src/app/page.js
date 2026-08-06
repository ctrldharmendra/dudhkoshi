import Hero from '@/pages/landing/Hero'
import TechnicalSpecification from '@/pages/landing/about/TechnicalSpecification'
import React from 'react'
import ProjectTeam from '@/pages/landing/ProjectTeam'
import TechnicalSpecifications from '@/pages/landing/TechnicalSpecification'
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

const page = () => {
  return (
   <>
   <Hero></Hero>  
   <TechnicalSpecification></TechnicalSpecification>
   <TeamSection></TeamSection>
   <GalleryPage></GalleryPage>
   <NewsEventsSection></NewsEventsSection>
   <ProjectOverviewSection></ProjectOverviewSection>
   <WaterToWireSection></WaterToWireSection>
   <ContactSection></ContactSection>
   <FaqSection></FaqSection>
   <PreFooterCTA></PreFooterCTA>
   <Footer></Footer>
   {/* <TeamSection></TeamSection>
   <ProjectTeam></ProjectTeam>
 <TechnicalSpecifications></TechnicalSpecifications>
  <WaterToWireSystem></WaterToWireSystem> 
    <FinancialOverview></FinancialOverview>  */}
   </>
  )
}


export default page