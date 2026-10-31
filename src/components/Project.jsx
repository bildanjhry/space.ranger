import { useRef } from 'react';

import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { LuGithub } from "react-icons/lu";

const projects = [
  {
    title: "BeliMudah",
    description: "An e-commerce app designed to make it easy for users to discover, choose, and purchase products.",
    link:"https://beli-mudah.vercel.app"
  },
  {
    title: "ShortLik",
    description: `A shortlink application that allows users to create, manage, and share shortened URLs easily.`,
    link:"https://x-shrt.vercel.app"
  },
  {
    title: "Pulse",
    description: "A simple notes management app that helps users create, organize, and manage their notes easily.",
    link:"https://pulse-notex.vercel.app"
  },
  {
    title: "Webcc Synergix",
    description: "An omnichannel system to handle ticketing. Integrate Communication platform, such as WA, IG, Phone, Email and Sms.",
  },
];

export default function FeaturedProjects() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-27 px-4 md:px-8 max-w-7xl mx-auto text-white/60">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Featured Projects
          </h2>
          <a href="https://github.com/bildanjhry" 
          className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
            See github <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={scrollLeft} 
            className="p-2 rounded-lg bg-white bg-linear-to-r 
            from-neutral to-neutral-700/30 hover:bg-gray-50 text-gray-700 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={scrollRight} 
            className="p-2 bg-linear-to-r 
            from-neutral to-neutral-700/30 rounded-lg bg-white hover:bg-gray-50 
            text-gray-700 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Section */}
      <div 
        ref={scrollRef} 
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
      >
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="min-w-[300px] group overflow-hidden md:min-w-[400px] snap-start flex flex-col"
          >
            {/* Image / Logo Placeholder */}
            <div className='overflow-hidden h-80 mb-6 rounded-2xl'>
              <div className="bg-gray-200/80 bg-linear-to-r
              transition-all duration-300 group-hover:scale-110 
                from-neutral to-neutral-700/30 rounded-2xl 
                aspect-[4/3] flex items-center justify-center overflow-hidden h-80">
                {/* Recreating the hexagonal logo with stripes */}
                <div className="relative w-24 h-24 ">
                  <div className="absolute inset-0 
                  [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]">
                    <div className="absolute inset-0 flex">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex-1 h-full bg-white bg-linear-to-r 
                        from-neutral to-neutral-700/30 opacity-40" style={{width: '4px'}} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card Content */}
            <h3 className="text-2xl font-semibold  mb-3">
              {project.title}
            </h3>
            <p className="text-white/40 leading-relaxed mb-6">
              {project.description}
            </p>
            
            <div className="flex items-center gap-3">
              <a 
              className='h-9 w-fit px-2 gap-2 rounded-full flex justify-center items-center 
               border-white/20 text-[14px]'
              href="">
                <LuGithub/>
                <p>Source</p>
              </a>
              <a href={project?.link} 
              target="_blank"
              className="mt-auto bg-white text-black border w-25 flex 
              justify-center h-9 rounded-full items-center gap-2 font-medium 
              text-[14px] hover:gap-3 transition-all bg-linear-to-r 
                from-neutral to-neutral-700/30">
                Visit <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}