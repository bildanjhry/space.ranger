import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";
import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { 
  ArrowRight, 
  ChevronRight, 
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
          <h1 className="text-white text-5xl md:text-[7rem] font-sans font-black tracking-tighter text-balance">
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
              className="text-md text-zinc-500 whitespace-nowrap border border-white/10 rounded-full px-4.5 py-1.5 shrink-0"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
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
          <div className="relative py-24 md:py-36 md:pb-18 ">
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

                  <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl font-semibold tracking-tight md:text-5xl lg:mt-16 xl:text-[5rem]">
                    <TextEffect preset="blur" per="word" delay={0.2}>
                      Full Stack Dev trying to contribute to the future.
                    </TextEffect>
                  </h1>
                  <button className='w-12 h-12 mt-9 rounded-full border border-white/20'>
                    <p className='text-white/40 text-xl'>{"</>"}</p>
                  </button>
                  <p className="mx-auto mt-9 max-w-2xl text-balance text-4xl">
                    <TextEffect preset="slide" per="word" delay={0.5}>
                      Building exceptional application with modern technologies and clean code with 3+ years of experiences.
                        I care most about the gap between a good idea and a product people actually trust performance, clarity, and the small details that make software feel considered rather
              than assembled.
                    </TextEffect>
                  </p>
                </AnimatedGroup>

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

        <div className='w-52 h-52 mb-10 rounded-full bg-amber-50 flex justify-self-center'>

        </div>

            <section id="contact" className="relative px-6 py-28">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl font-semibold text-white mb-6">
              <TextEffect preset="slide" per="word" delay={0.2}>
                    Let's connect and build something out of this world.
              </TextEffect>
          
          </h2>
          <p className="text-white/50 mb-10 max-w-md mx-auto">
            I'm currently open to new opportunities and interesting collaborations. Reach out and
            I'll get back to you within a day or two.
          </p>
          
               
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