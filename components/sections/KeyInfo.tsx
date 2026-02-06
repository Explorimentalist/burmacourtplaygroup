
import React from 'react';
import { motion } from 'framer-motion';

const KeyInfo: React.FC = () => {
  const [rotations, setRotations] = React.useState([0, 0, 0]);
  
  const generateNewRotation = (index: number) => {
    const newRotations = [...rotations];
    newRotations[index] = (Math.random() - 0.5) * 4; // Random between -2 and 2
    setRotations(newRotations);
  };
  return (
    <section className="bg-secondary-500 pt-20 pb-20 px-6 md:px-20">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="font-display text-48 text-neutral-800 mb-12 ml-0 md:ml-2">
          Key info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-key-info">
          
          <div className="flex flex-col">
            <div className="h-[222px] w-full relative mb-0 flex items-end mb-8">
              <motion.div
                initial={{ y: 0, rotate: 0 }}
                whileHover={{ y: -8, rotate: rotations[0] }}
                onHoverStart={() => generateNewRotation(0)}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                style={{ transformOrigin: 'bottom center' }}
                className="cursor-pointer"
              >
                <img src="/illustrations/informational/ages.svg" alt="Ages" className="text-neutral-600" />
              </motion.div>
            </div>
            <h3 className="font-sans font-medium text-20 text-neutral-800 mt-0 mb-4">
              Ages
            </h3>
            <div className="font-sans font-regular text-16 text-neutral-600 space-y-6">
              <p>
                We cater to a maximum of 16 children from the age of two through the end of the Early Years age group, ensuring an intimate and attentive setting.
              </p>
              <p>
                Our facility features exclusive use of the Mabel Thornton Community Hall and an adjoining outdoor playground with rubberised flooring, designed for safe exploration in all weather.
              </p>
              <p>
                We think differently about education by following the Early Years Foundation Stage Curriculum through a balance of child-chosen play and adult-led group activities that build a child's ability to see tasks through to completion.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="h-[222px] w-full relative mb-0 flex items-end justify-start md:justify-center mb-8">
              <motion.div
                initial={{ y: 0, rotate: 0 }}
                whileHover={{ y: -8, rotate: rotations[1] }}
                onHoverStart={() => generateNewRotation(1)}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                style={{ transformOrigin: 'bottom center' }}
                className="cursor-pointer"
              >
                <img src="/illustrations/informational/fees.svg" alt="Fees" className="text-neutral-600" />
              </motion.div>
            </div>
            <h3 className="font-sans font-medium text-20 text-neutral-800 mt-0 mb-4">
              Fees & Funded hours
            </h3>
            <div className="font-sans font-regular text-16 text-neutral-600 space-y-6">
              <p>
                The playgroup is primarily funded by Nursery Education Grants, providing 15 or 30 funded hours depending on your child's age and status.
              </p>
              <p>
                For additional hours, fees are £8.75 per hour for two-year-olds and £6.75 per hour for three- and four-year-olds. We also support families through Tax-Free Childcare and funding via the Hackney Learning Trust for those on low incomes.
              </p>
            
            </div>
          </div>

          <div className="flex flex-col">
            <div className="h-[222px] w-full relative mb-0 flex items-end justify-start md:justify-end mb-8">
              <motion.div
                initial={{ y: 0, rotate: 0 }}
                whileHover={{ y: -8, rotate: rotations[2] }}
                onHoverStart={() => generateNewRotation(2)}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                style={{ transformOrigin: 'bottom center' }}
                className="cursor-pointer"
              >
                <img src="/illustrations/informational/session.svg" alt="Session Times" className="text-neutral-600" />
              </motion.div>
            </div>
            <h3 className="font-sans font-medium text-20 text-neutral-800 mt-0 mb-4">
              Session Times & Lunch Club
            </h3>
            <div className="font-sans font-regular text-16 text-neutral-600 space-y-6">
              <p>
                Our sessions run during term time from 9am to 4pm, following the Hackney Learning Trust school calendar for approximately 39 weeks a year.
              </p>
              <p>
                Parents have the flexibility of a 12pm pick-up or a full-day stay that includes our lunch club, which carries a modest £6.75 fee. While we provide the structured learning and wet-weather gear, parents provide a nut-free packed lunch and snacks for their children.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyInfo;
