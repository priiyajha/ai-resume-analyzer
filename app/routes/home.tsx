import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Analyze your Resume!" },
  ];
}

export default function Home() {
  return <main>
    <section>
      <div>
        <h1>
          <h3></h3>
        </h1>
      </div>
    </section>
  </main>
}
