import Hero from '@/pages/landing/Hero'
import AboutSection from '@/pages/landing/AboutSection'
import React from 'react'
import TeamSection from '@/pages/landing/Team'
import ProjectTeam from '@/pages/landing/ProjectTeam'
import TechnicalSpecifications from '@/pages/landing/TechnicalSpecification'
import WaterToWireSystem from '@/pages/landing/WaterToWire'
import FinancialOverview from '@/pages/landing/FinancialOverview'

const page = () => {
  return (
   <>
   <Hero></Hero>  
   <AboutSection></AboutSection>
   <TeamSection></TeamSection>
   <ProjectTeam></ProjectTeam>
 <TechnicalSpecifications></TechnicalSpecifications>
  <WaterToWireSystem></WaterToWireSystem> 
    <FinancialOverview></FinancialOverview> 
   </>
  )
}


export default page