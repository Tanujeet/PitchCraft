import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const QuickAction = () => {
  const router = useRouter();

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-4"> Quick Actions</h2>
      <div className="space-x-3">
        <Button onClick={() => router.push("/create")}>
          Generate New Pitch
        </Button>
      </div>
    </section>
  );
};

export default QuickAction;
