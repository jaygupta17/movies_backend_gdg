import {Feed} from "@/components/Feed";
import { Form } from "@/components/form";

export default function Home() {
  return (
    <div className="min-h-screen dark bg-background relative py-3">
      <Form/>
      <Feed/>
    </div>
  );
}
