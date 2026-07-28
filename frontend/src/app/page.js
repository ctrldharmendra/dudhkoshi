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

const page = () => {
  return (
   <>
   <Hero></Hero>  
   <TechnicalSpecification></TechnicalSpecification>
   <TeamSection></TeamSection>
   {/* <GalleryPage></GalleryPage> */}
   <NewsEventsSection></NewsEventsSection>
   {/* <TeamSection></TeamSection>
   <ProjectTeam></ProjectTeam>
 <TechnicalSpecifications></TechnicalSpecifications>
  <WaterToWireSystem></WaterToWireSystem> 
    <FinancialOverview></FinancialOverview>  */}
   </>
  )
}


export default page