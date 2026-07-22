import Hero from '@/pages/landing/Hero'
import TechnicalSpecification from '@/pages/landing/about/TechnicalSpecification'
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
   <TechnicalSpecification></TechnicalSpecification>
   {/* <TeamSection></TeamSection>
   <ProjectTeam></ProjectTeam>
 <TechnicalSpecifications></TechnicalSpecifications>
  <WaterToWireSystem></WaterToWireSystem> 
    <FinancialOverview></FinancialOverview>  */}
   </>
  )
}


export default page