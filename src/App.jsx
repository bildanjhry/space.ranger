import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";
import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { 
  Menu, 
  X, 
  Mail,
  Code,
  Briefcase,
  User,
  Award,
  Star,
  ExternalLink
} from 'lucide-react';

import { cn } from './lib/utils.js';
const mono = { fontFamily: "'JetBrains Mono', ui-monospace, monospace" };

import { Warp } from "@paper-design/shaders-react"


function TextEffect({ 
  children, 
  per = 'word', 
  as = 'p', 
  className, 
  preset = 'blur',
  delay = 0,
  trigger = true 
}) {
  let segments;
  
  if (per === 'line') {
    segments = children.split('\n');
  } else if (per === 'word') {
    segments = children.split(/(\s+)/);
  } else {
    segments = children.split('');
  }

  const MotionTag = motion[as];
  const stagger = per === 'char' ? 0.03 : per === 'word' ? 0.05 : 0.1;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = preset === 'blur' 
    ? { hidden: { opacity: 0, filter: 'blur(12px)' }, visible: { opacity: 1, filter: 'blur(0px)' } }
    : preset === 'slide'
    ? { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0 }, visible: { opacity: 1 } };

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className={cn('whitespace-pre-wrap', className)}
        >
          {segments.map((segment, index) => {
            if (per === 'char') {
              return (
                <motion.span key={`char-${index}`} variants={itemVariants} className="inline-block">
                  {segment}
                </motion.span>
              );
            }
            return (
              <motion.span key={`segment-${index}`} variants={itemVariants} 
              className="inline-block bg-white/80 text-transparent bg-clip-text 
                    bg-linear-to-r from-neutral to-neutral-700/40 ">
                {segment}
              </motion.span>
            );
          })}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}


function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.2, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: "BeliMudah",
    description: "An e-commerce app designed to make it easy for users to discover, choose, and purchase products.",
    link:"http://103.127.96.192:9202"
  },
  {
    title: "ShortLik",
    description: `A shortlink application that allows users to create, manage, and share shortened URLs easily.`,
    link:"https://x-shrt.vercel.app"
  },
  {
    title: "Pulse",
    description: "A simple notes management app that helps users create, organize, and manage their notes easily.",
  },
  {
    title: "Webcc Synergix",
    description: "Streamline your workflow with our developer tools and documentation.",
  },
];

 function FeaturedProjects() {
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


function WarpShaderHero() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className='h-full w-full absolute z-10 bg-linear-to-t from-neutral-950 to-neutral-50/10'>

      </div>
      <div className="absolute inset-0">
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.6}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={["hsl(222.2 4% 4.9%)", "hsl(888, 2%, 2%)", "hsl(777, 7%, 5%)", "hsl(666, 50%, 5%)"]}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl w-full text-center space-y-8">
          <h1 className="text-white text-6xl md:text-[7rem] font-sans font-black tracking-tighter text-balance">
              <TextEffect preset="blur" per="word" delay={0.2}>
                  Hello there, I'm Bildan Jauhary
              </TextEffect>
          </h1>
{/* 
          <p className="text-white/90 text-xl md:text-2xl font-sans font-light leading-relaxed max-w-3xl mx-auto">
            Beautiful, performant shader effects that enhance your content without overwhelming it. Perfect for hero
            sections, landing pages, and modern web experiences.
          </p> */}

          <div className="flex flex-col sm:flex-row justify-center items-center">
          <button className="bg-white/90 
              transition-all duration-300 
              hover:-translate-y-0.75
              mt-5
              cursor-pointer bg-linear-to-r 
              from-neutral to-neutral-700/30 font-[600] rounded-full 
              flex gap-2 text-[15px] justify-center items-center w-52 h-11">
                <FiDownload/>
                <p>Download Resume</p>
              </button>
          </div>
        </div>
      </div>
    </main>
  )
}


function BackgroundPaths({ title }) {
  const words = title.split(" ");

  return (
    <div className="relative min-h-screen 
    pt-7 w-full flex items-center justify-center
    overflow-hidden bg-white dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className='h-full z-10 bg-linear-to-t from-neutral-950 to-transparent w-full absolute'>

      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          {/* <h1 className="text-5xl sm:text-7xl text-white/70 md:text-9xl w-[60%] text-left font-bold mb-1 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text 
                    bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                    dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </motion.span>
                  
                ))}
              </span>
            ))}
            </h1> */}
            <div className='flex flex-col items-center'>
              <h1 className="text-5xl sm:text-7xl inline-block md:text-[7rem] font-bold mb-4 tracking-tighter">
                  <TextEffect preset="blur" per="word" delay={0.2}>
                          Hello there, I'm Bildan Jauhary
                  </TextEffect>
              </h1>
              <button className="bg-white/90 
               transition-all duration-300 
              hover:-translate-y-0.75
              mt-6
              cursor-pointer bg-linear-to-r 
              from-neutral to-neutral-700/30 font-[600] rounded-full 
              flex gap-2 text-[15px] justify-center items-center w-52 h-11">
                <FiDownload/>
                <p>Download Resume</p>
              </button>
            </div>
          {/* <div
            className="inline-block group relative mt-5 bg-gradient-to-b from-black/10 to-white/10 
            dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
            overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Button
              variant="ghost"
              className="rounded-full px-8 py-6 text-md font-semibold backdrop-blur-md 
              bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
              text-black dark:text-white transition-all duration-300 
              group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
              hover:shadow-md dark:hover:shadow-neutral-800/50 cursor-pointer"
            >
              <FiDownload/>
              <span className="ml-2.5 opacity-90 group-hover:opacity-100 transition-opacity">
                Download Resume
              </span>
            </Button>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
}


import { Compass, Clock, Heart } from 'lucide-react';
import { MdOutlineWorkOutline } from "react-icons/md";
import { RiPushpin2Line } from "react-icons/ri";

const journeySteps = [
  { 
    id: 1, 
    title: "Koda Tech Academy",
    type:"Project Based",
    duration:"May 2026 - Aug 2026",
    role:"Fullstack Engineer",
    description:
    [
      'Developed a full-featured e-commerce platform with responsive design for both mobile and desktop users.',
      'Integrated product listing, cart management, and user authentication using JWT.',
      'Built a modular frontend using React.js, Tailwind CSS, React Router, and Redux Toolkit, with role-based access for users and admins.',
      'Implementing REST API with Gin-gonic and Express.js.',
      'Use PostgreSQL with database migrations.'
    ],
    icon: RiPushpin2Line },
  { 
    id: 2, 
    title: "Jaring Synergi Mandiri",
    type:"Fulltime", 
    duration:"Jan 2023 - Jan 2025",
    role:"Frontend Developer",
    description:
    [
      'Developed a full-featured e-commerce platform with responsive design for both mobile and desktop users.',
      'Integrated product listing, cart management, and user authentication using JWT.',
      'Built a modular frontend using React.js, Tailwind CSS, React Router, and Redux Toolkit, with role-based access for users and admins.',
      'Implementing REST API with Gin-gonic and Express.js.',
      'Use PostgreSQL with database migrations.'
    ], icon: RiPushpin2Line },
  { 
    id: 3, 
    title: "Dumbways.id", 
    type:"Project Based",
    duration:"Sep 2022",
    role:"Fullstack Developer",
    description:
    [
      'Developed a full-featured e-commerce platform with responsive design for both mobile and desktop users.',
      'Integrated product listing, cart management, and user authentication using JWT.',
      'Built a modular frontend using React.js, Tailwind CSS, React Router, and Redux Toolkit, with role-based access for users and admins.',
      'Implementing REST API with Gin-gonic and Express.js.',
      'Use PostgreSQL with database migrations.'
    ], icon: RiPushpin2Line },
];

function JourneyTimeline() {
  return (
    <div className='w-full flex justify-center my-10'>
      <section className="py-16 px-4 md:px-1  w-[80%]">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white/60 mb-4 tracking-tight">
            The experiences journey
          </h2>
          <p className="text-white/60 max-w-2xl text-lg">
            My experiences journey so far.
          </p>
        </div>

        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/40 transform -translate-x-1/2" />

          <div className="space-y-12">
            {journeySteps.map((step, index) => (
              <div key={step.id} className={`relative flex flex-col md:flex-row items-start gap-4 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* Icon Node */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 bg-white
                 bg-linear-to-r from-neutral-300/60 to-neutral-950/30 
                 p-2 rounded-full border border-white/30 z-10">
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center">
                    <step.icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-1' : 'md:pl-1'}`}>
                  <div className="bg-linear-to-r from-neutral-900 to-neutral-950 
                  hover:bg-gray-100 transition-colors p-7 rounded-2xl border border-neutral-800 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-white/60 tracking-wide">{step.type}</span>
                      <span className='text-sm font-semibold text-white/60 tracking-wide'>{step.duration}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white/60 ">{step.title}</h3>
                    <p className=' text-white/70 mb-4'>{step.role}</p>
                    <ul className='flex flex-col gap-2'>
                      {step.description.map((item, index) => (
                        <li key={index} className='text-white/50 leading-relaxed flex gap-2'>
                          <div className='h-5 w-5 relative mt-3
                          shrink-0 rounded-full flex justify-center items-center text-black/70 bg-white bg-linear-to-r from-neutral-200 to-neutral-400'>
                          <RiPushpin2Line size={12} className='shrink-0 relative'/>

                          </div>
                          <p className='bg-amber-50/5 
                        py-2 px-3 rounded-lg '>{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}


// ==================== BUTTON COMPONENT ====================
const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  asChild = false, 
  children,
  ...props 
}, ref) => {
  const Comp = asChild ? 'span' : 'button';
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2 rounded-full",
    sm: "h-9 rounded-full w-9",
    lg: "h-11 rounded-full px-3",
    icon: "h-10 w-10 rounded-full",
  };
  
  return (
    <Comp
      className={cn(
        `inline-flex items-center justify-center whitespace-nowrap overflow-hidden 
        text-sm font-medium ring-offset-background transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
        focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
});




// // ==================== ANIMATED GROUP COMPONENT ====================
// const defaultContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const defaultItemVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
// };

// const presetVariants = {
//   fade: {
//     container: defaultContainerVariants,
//     item: {
//       hidden: { opacity: 0 },
//       visible: { opacity: 1 },
//     },
//   },
//   slide: {
//     container: defaultContainerVariants,
//     item: {
//       hidden: { opacity: 0, y: 20 },
//       visible: { opacity: 1, y: 0 },
//     },
//   },
//   scale: {
//     container: defaultContainerVariants,
//     item: {
//       hidden: { opacity: 0, scale: 0.8 },
//       visible: { opacity: 1, scale: 1 },
//     },
//   },
//   blur: {
//     container: defaultContainerVariants,
//     item: {
//       hidden: { opacity: 0, filter: 'blur(4px)' },
//       visible: { opacity: 1, filter: 'blur(0px)' },
//     },
//   },
// };

// function AnimatedGroup({ children, className, variants, preset = 'fade' }) {
//   const selectedVariants = preset ? presetVariants[preset] : { container: defaultContainerVariants, item: defaultItemVariants };
//   const containerVariants = variants?.container || selectedVariants.container;
//   const itemVariants = variants?.item || selectedVariants.item;

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className={cn(className)}
//     >
//       {React.Children.map(children, (child, index) => (
//         <motion.div key={index} variants={itemVariants}>
//           {child}
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }

// ==================== TEXT EFFECT COMPONENT ====================

// ==================== LOGO COMPONENT ====================
const Logo = ({ className }) => {
  return (
    <div className='text-white/70 font-black text-md'>
      <p>space.ranger</p>
    </div>
  );
};

// ==================== HEADER COMPONENT ====================
const menuItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav data-state={menuState && 'active'} className="fixed  text-white/70 z-20 w-full px-2 group">
        <div className={cn(
          'mx-auto mt-2 max-w-6xl px-6  border-white/10 rounded-full  transition-all duration-300 lg:px-12',
          isScrolled && 'bg-background/50 border max-w-4xl rounded-full backdrop-blur-lg lg:px-8'
        )}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <a href="#home" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </a>
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild  size="sm" 
                className={cn(isScrolled && 'lg:hidden')}>
                  <a href="https://github.com/bildanjhry"
                  target='_blank' 
                  className="cursor-pointer flex justify-center items-center 
                  bg-white/80 text-black h-full w-full">
                    <LuGithub/>
                  </a>
                </Button>
                <Button asChild size="lg" className={cn(isScrolled && 'lg:hidden')}>
                  <a href="#contact">Contact</a>
                </Button>
                <Button asChild size="lg" className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                  <a href="#contact">Contact</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};


// ==================== ANIMATED GROUP COMPONENT ====================
function AnimatedGroup({ children, className, variants, preset = 'fade' }) {
  const defaultContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const defaultItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const presetVariants = {
    fade: {
      container: defaultContainerVariants,
      item: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    },
    slide: {
      container: defaultContainerVariants,
      item: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
    },
    scale: {
      container: defaultContainerVariants,
      item: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
    },
    blur: {
      container: defaultContainerVariants,
      item: { hidden: { opacity: 0, filter: 'blur(4px)' }, visible: { opacity: 1, filter: 'blur(0px)' } },
    },
  };

  const selectedVariants = preset ? presetVariants[preset] : { container: defaultContainerVariants, item: defaultItemVariants };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ==================== HERO SECTION ====================
const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};


const STACK_ROW_1 = [
  "React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS",
  "Redux Toolkit", "React Query", "HTML5 / CSS3", "Vite / Webpack",
];
const STACK_ROW_2 = [
  "Go", "Gin", "REST API", "JWT Auth", "PostgreSQL", "Redis", "GORM",
  "Docker", "GitHub Actions", "AWS (EC2, S3, RDS)", "CI/CD", "System Design",
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};


// Duplicate the array to make it seamless
// const duplicatedTechs = [...techs, ...techs];


const DEFAULT_ROW_1 = [
  "React.js", "Next.js", "JavaScript (ES6+)", "Tailwind CSS",
  "Redux", "Redux Toolkit", "CSS3", "HTML5", "Vite / Webpack",
];
const DEFAULT_ROW_2 = [
  "Go", "Gin", "REST API", "JWT Auth", "PostgreSQL", "Redis", "ORM",
  "Docker", "GitHub Actions", "Express.js", "CI/CD", "System Design",
];

function TechStackTicker({
  rowOne = DEFAULT_ROW_1,
  rowTwo = DEFAULT_ROW_2,
}) {
  const row1 = useMemo(() => [...rowOne, ...rowOne], [rowOne]);
  const row2 = useMemo(() => [...rowTwo, ...rowTwo], [rowTwo]);

  return (
    <section className="relative  py-6 overflow-hidden flex flex-col gap-3">
      <style>{`
        @keyframes scrollLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scrollRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        .ticker-left { animation: scrollLeft 34s linear infinite; }
        .ticker-right { animation: scrollRight 40s linear infinite; }
        .blink-dot { animation: blink 1.4s ease-in-out infinite; }
      `}</style>

        <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="flex overflow-hidden">
        <div className="ticker-left flex items-center gap-3 shrink-0 pr-3">
          {row1.map((s, i) => (
            <span
              key={i}
              style={mono}
              className="text-md text-zinc-300 
              whitespace-nowrap border border-white/10 rounded-full px-4.5 py-1.5 shrink-0"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="flex overflow-hidden">
        <div className="ticker-right flex items-center gap-3 shrink-0 pr-3">
          {row2.map((s, i) => (
            <span
              key={i}
              style={mono}
              className="text-md text-zinc-500 whitespace-nowrap border border-white/10 
              rounded-full px-4.5 py-1.5 shrink-0"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

import { FaConnectdevelop } from "react-icons/fa";

function SchemaCard() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let time = 0;
    const waveData = Array.from({ length: 8 }).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01
    }));

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function updateWaveData() {
      waveData.forEach(data => {
        if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1;
        const diff = data.targetValue - data.value;
        data.value += diff * data.speed;
      });
    }

    function draw() {
      ctx.fillStyle = 'hsl(0 0% 3.9%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveData.forEach((data, i) => {
        const freq = data.value * 7;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const nx = (x / canvas.width) * 2 - 1;
          const px = nx + i * 0.04 + freq * 0.03;
          const py = Math.sin(px * 10 + time) * Math.cos(px * 2) * freq * 0.1 * ((i + 1) / 8);
          const y = (py + 1) * canvas.height / 2;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const intensity = Math.min(1, freq * 0.3);
        const r = 79 + intensity * 120;
        const g = 70 + intensity * 130;
        const b = 229;
        ctx.lineWidth = 1 + i * 0.3;
        ctx.strokeStyle = `rgba(${r},${g},${b},0.6)`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.5)`;
        ctx.shadowBlur = 5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    }

    function animate() {
      time += 0.02;
      updateWaveData();
      draw();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="w-full h-200 absolute bg-transparent" />
      <div className="relative flex items-center justify-center w-full h-200 bg-transparent bottom-0 p-4 z-">

      <section id="contact" className=" px-6 py-28">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-6xl font-semibold text-white mb-6">
              <TextEffect preset="slide" per="word" delay={0.2}>
                    Let's connect and build something out of this world.
              </TextEffect>
          
          </h2>
          <div className="text-white/80 mb-10 max-w-md mx-auto flex flex-col
          justify-center items-center gap-2 bg-white/10 relative p-5 rounded-2xl backdrop-blur-md">
              <div className='absolute -top-3 h-6 w-6 rounded-full flex justify-center items-center
               bg-white bg-linear-to-r from-transparent to-neutral-300'>
                <FaConnectdevelop size={20} className='text-black'/>
              </div>  
              <p className=''>
                I'm currently open to new opportunities and interesting collaborations. Reach out and
                I'll get back to you within a day or two.
              </p>
          </div>
          
            <div
            className="inline-block group relative mb-6 bg-gradient-to-b from-black/10 to-white/10 
            dark:from-white/10 dark:to-black/10 p-1 rounded-full backdrop-blur-lg 
            overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Button
              variant="ghost"
              className="rounded-full px-8 py-6 text-md font-semibold backdrop-blur-md 
              bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
              text-black dark:text-white transition-all duration-300 
              group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
              hover:shadow-md dark:hover:shadow-neutral-800/50 cursor-pointer"
            >
              <BiLogoGmail className='relative bottom-px'/>
              <span className="ml-2.5 opacity-90 group-hover:opacity-100 transition-opacity">
                Gmail Me
              </span>
            </Button>
          </div>
 
          <div className="flex items-center justify-center gap-6">
            {[
              { icon: LuGithub, label: "Github" },
              { icon: FaLinkedinIn, label: "LinkedIn" },
              { icon: FaWhatsapp, label: "Whatsapp" },
            ].map(({ icon: Icon, label }) => (
              <a key={label} href="#" aria-label={label} 
              className="text-white/30 hover:text-white/70
               transition-colors">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

      </section>

      </div>
    </>
  );
}

function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden dark:bg-neutral-950">
        <div
          aria-hidden
          className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
        >
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        {/* <BackgroundPaths title="Hello there, I'm Bildan Jauhary" /> */}
            <WarpShaderHero/>
    
        <section id="home">
          <div className="relative py-22 md:py-36 ">
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  {/* <a
                    href="#projects"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">View My Portfolio</span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </a> */}
                  <button className='w-14 h-14 mt-9 rounded-full border border-white/20'>
                    <p className='text-white/40 text-2xl'>{"</>"}</p>
                  </button>

                  <h1 className="mt-5 md:mt-8 max-w-4xl mx-auto text-balance text-5xl font-semibold tracking-tight 
                  md:text-5xl lg:mt-8 xl:text-[5rem]">
                    <TextEffect preset="blur" per="word" delay={0.2}>
                      Full Stack Dev trying to contribute to the future.
                    </TextEffect>
                  </h1>
                  <p className="mx-auto mt-5 max-w-2xl text-balance text-white/70 text-xl md:text-[1.2rem]">
                      Building exceptional application with modern technologies and clean code with 3+ years of experiences.
                  </p>
                </AnimatedGroup>
                  {/* <p className="mx-auto mt-7 max-w-2xl text-balance text-xl md:text-2xl">
                    <TextEffect preset="slide" per="word" delay={0.5}>
                      "I care most about the gap between a good idea and a product people actually trust performance, clarity, and the 
                      small details that make software feel considered rather than assembled."
                    </TextEffect>
                  </p> */}
                  <div className="w-30 mt-10 h-1 border-b justify-self-center border-white/40">

                  </div>

              </div>
            </div>

          </div>

          <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6 }}
          className="mb-0"
        >
        </motion.div>

        {/* <div className='w-32 h-32 mb-18 rounded-full bg-amber-50 flex
        justify-center items-center text-black/40 justify-self-center'>
            <IoPersonOutline size={30}/>
        </div> */}
      <div className="relative overflow-hidden bg-background mb-10 py-6">
      <TechStackTicker/>
      {/* <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
      >
        {duplicatedTechs.map((tech, index) => (
          <span
            key={index}
            className="text-md text-white border border-border/30 rounded-full px-4 py-1.5 mx-3"
          >
            {tech}
          </span>
        ))}
      </motion.div> */}
    </div>

        <FeaturedProjects/>

        <JourneyTimeline/>

            <section className='flex flex-col gap-3 w-full py-20 items-center justify-center'>
              <p className="mx-auto mt-7 flex justify-center items-center w-[90%] md:max-w-4xl text-center text-xl 
              md:text-4xl ">
                  <TextEffect preset="slide" per="word" delay={0.5}>
                        "I care most about the gap between a good idea and a product people actually trust performance, clarity, and the 
                        small details that make software feel considered rather than assembled."
                  </TextEffect>
              </p>
              <div className="w-[60%] md:w-100 mt-7 h-px justify-self-center bg-linear-to-r 
              from-white/5 via-white/40 to-white/5">

              </div>
              <p className='text-white/80 mt-7 text-4xl'>Bildan Jauhary</p>
              <p className='text-white/50 relative bottom-2 text-xl'>@spaceranger</p>
              <div className='w-28 h-28 mt-2 rounded-full bg-amber-50 flex
              justify-center items-center overflow-hidden text-black/40 justify-self-center'>
                <IoPersonOutline size={30}/>
                <img src="fix.png" 
                className='z-11 top-10'
                alt="" srcset="" />
              </div>
            </section>
        <SchemaCard/>

    <div className="relative overflow-hidden bg-background mb-10 py-6">
      <TechStackTicker/>
      {/* <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
      >
        {duplicatedTechs.map((tech, index) => (
          <span
            key={index}
            className="text-md text-white border border-border/30 rounded-full px-4 py-1.5 mx-3"
          >
            {tech}
          </span>
        ))}
      </motion.div> */}
    </div>


        {/* <section className="relative mb-10  py-6 overflow-hidden flex flex-col gap-3">
        <div className="flex overflow-hidden">
          <div className="ticker-left flex items-center gap-3 shrink-0 pr-3">
            {row1.map((s, i) => (
              <span key={i} style={mono} className="text-sm text-zinc-400 whitespace-nowrap border border-white/10 rounded-full px-3.5 py-1.5 shrink-0">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div className="ticker-right flex items-center gap-3 shrink-0 pr-3">
            {row2.map((s, i) => (
              <span key={i} style={mono} className="text-sm text-zinc-500 whitespace-nowrap border border-white/10 rounded-full px-3.5 py-1.5 shrink-0">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section> */}


        </section>
        <div className='h-20 flex flex-rows  justify-center gap-3 items-center 
        w-full text-white/60 border-t border-white/10'>
          <p className='font-black relative bottom-px'>space.ranger</p>
          <p className='text-sm text-white/30'>© 2026 All Rights Reserved.</p>
        </div>
        
      </main>
    </>
  );
}

// ==================== MAIN APP ====================
function App() {
  return (
    <div className="App">
      <HeroSection />
    </div>
  );
}

export default App;