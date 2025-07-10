import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";


const Features = () => {
    const features = [
      { title: "AI-Generated Slides", desciption: "Automaticaly generate compelling sildes with AI - powered content and design" },
      { title: "Notion-Like Slide Editor", desciption:"Easily edit and customize your slides with our intutive,Notionlike editor" },
      { title: "PDF Export & sharable Links", desciption: "Export your pitch deck as a PDF or share it with a unique ,trackable link" },
      { title: "Team Collaboration", desciption: "Collabarote with your team in real-life to refine and perfect your pitch desk" },
      { title: "Stripe Billing Intergration", desciption: "Seamlessly manage your subscription and billing with stripe integration" },
      { title: "Custom Themes", desciption: "Choose from a variety if custom themes to match your brand's style" },
    ];

  return (
    <section className="py-10 px-10">
      <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {features.map((fea, idx) => (
          <Card
            key={idx}
            className="h-full"
          >
            <CardHeader>
              <div>
                <CardTitle>{fea.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{fea.desciption}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;