import Hero from '@/pages/landing/Hero'
import TechnicalSpecification from '@/pages/landing/about/TechnicalSpecification'
import React from 'react'
import ProjectTeam from '@/pages/landing/ProjectTeam'
import TechnicalSpecifications from '@/pages/landing/TechnicalSpecification'
import WaterToWireSystem from '@/pages/landing/WaterToWire'
import FinancialOverview from '@/pages/landing/FinancialOverview'
import TeamSection from '@/pages/landing/team/Team'

const page = () => {
  return (
   <>
   <Hero></Hero>  
   <TechnicalSpecification></TechnicalSpecification>
   <TeamSection></TeamSection>
   {/* <TeamSection></TeamSection>
   <ProjectTeam></ProjectTeam>
 <TechnicalSpecifications></TechnicalSpecifications>
  <WaterToWireSystem></WaterToWireSystem> 
    <FinancialOverview></FinancialOverview>  */}
   </>
  )
}


export default page