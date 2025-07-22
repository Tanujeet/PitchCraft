import {
  Card,

  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const HowItWorksSection = () => {
    const howItWorksItems = [
      {
        title: "Describe your startup idea",
        description:
          "Provide a brief overview of your startup, including your mission, target audience, and key features.",
        link: "#",
        icon: "",
      },
      {
        title: "AI generates your pitch deck",
        description:
          "Our AI algorithms analyze your input and create a comprehensive pitch deck tailored to your startup’s needs.",
        link: "#",
        icon: "",
      },
      {
        title: "Edit, export as PDF, and share",
        description:
          "Customize your pitch deck with our intuitive editor, export it as a PDF, and share it with investors or your team.",
        link: "#",
        icon: "",
      },
    ];
  return (
    <section className="py-10 px-10">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {howItWorksItems.map((item, index) => (
          <Card key={index} className="h-full bg-black text-white hover:bg-white hover:text-black transition 2s border-2  border-black">
            <CardHeader>
              <div className="flex items-center gap-3">
                {item.icon}
                <CardTitle>{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
