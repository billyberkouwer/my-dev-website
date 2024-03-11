import { client } from "../../../sanity/config/client";
import "./nav.scss";

export default async function NavBar() {
  const projects = await client.fetch<any>(`*[_type == "project"]`);

  return (
    <nav className="wrapper__main-nav">
      <ul className="container__main-nav">
        <li>Billy Myles-Berkouwer</li>
        <li>selected projects</li>
        <li>experiments</li>
        <li>info</li>
      </ul>
    </nav>
  );
}
