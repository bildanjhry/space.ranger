import { RiPushpin2Line } from "react-icons/ri";

const journeySteps = [
    { 
    id: 1, 
    title: "NashTa Group",
    type:"Project Based",
    duration:"Sep 2026 - Oct 2026",
    role:"Frontend Developer",
    description:
    [
    'Working as a project-based Frontend Developer, building a Point of Sale (POS) application for cashiers.',
    'Developing responsive and interactive user interfaces using React.js and TypeScript.',
    'Implementing POS features to support cashier operations and transaction workflows.',
    'Integrating REST APIs and managing application state to ensure smooth data flow.',
    'Collaborating with backend developers to deliver functional and reliable application features.'
    ],
    icon: RiPushpin2Line },
  { 
    id: 2, 
    title: "Koda Tech Academy",  
    type:"Trainee",
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
    id: 3, 
    title: "Jaring Synergi Mandiri",
    type:"Fulltime", 
    duration:"Jan 2023 - Jan 2025",
    role:"Frontend Developer",
    description:
    [
      '2 years of professional experience as a Frontend Developer.',
      'Developed and maintained omnichannel ticketing platforms for various clients using React.js and Next.js.',
      'Built responsive and user-friendly interfaces to support multiple communication channels, including WhatsApp, phone, Facebook Messenger, Instagram, email, and SMS.',
      'Integrated REST APIs and collaborated with backend developers and business analysts to deliver features based on client requirements.',
      'Focused on building reusable components, maintainable code, and improving user experience.',
    ], icon: RiPushpin2Line },
  { 
    id: 4, 
    title: "Dumbways.id", 
    type:"Trainee",
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

export default function JourneyTimeline() {
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

