import { Home, Key, TrendingUp, Settings } from "lucide-react";

export function QuickServices() {
  const services = [
    {
      title: "Property Sales/Rentals",
      description: "Expert guidance through the entire property buying and renting process with market analysis.",
      icon: <Home className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Estate Development",
      description: "We develop modern estates, creating quality homes and investment opportunities.",
      icon: <Key className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: "Investment Advisory",
      description: "Strategic real estate investment advice to maximize your returns and build wealth.",
      icon: <TrendingUp className="h-8 w-8 text-amber-600 dark:text-amber-400" />
    },
    {
      title: "Property Management",
      description: "Comprehensive property management services to protect and enhance your investment.",
      icon: <Settings className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div 
              key={service.title}
              className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 text-center hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
