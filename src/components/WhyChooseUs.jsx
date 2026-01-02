import { Shield, Clock, Users, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Trusted & Verified",
    description: "All our properties are verified and come from trusted sources. We ensure complete transparency in every transaction.",
  },
  {
    icon: Clock,
    title: "Quick & Easy Process",
    description: "From search to keys, we streamline the entire process. Our efficient approach saves you time and hassle.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Our experienced agents provide personalized support throughout your property journey.",
  },
  {
    icon: Award,
    title: "Award Winning Service",
    description: "Recognized for excellence in customer service and satisfaction. Your dream home is our priority.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block rounded-md bg-accent/10 px-3 py-1 font-body text-sm font-medium text-accent">
            Why HomeFind
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mt-3 font-body text-muted-foreground">
            We're committed to making your property search seamless and successful.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group rounded-xl bg-card p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
