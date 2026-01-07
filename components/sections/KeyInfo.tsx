
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
                We provide care and education for children from the age of two to five years old.
              </p>
              <p>
                Burma Court Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend’s home for a play date. Small, friendly and fun!
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
                We provide care and education for children from the age of two to five years old.
              </p>
              <p>
                Burma Court Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend’s home for a play date. Small, friendly and fun!
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
                We provide care and education for children from the age of two to five years old.
              </p>
              <p>
                Burma Court Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend’s home for a play date. Small, friendly and fun!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyInfo;
