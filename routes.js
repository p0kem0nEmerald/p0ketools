/*!

=========================================================
* * NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// react-icons
import { ImCalculator } from "react-icons/im";
import { GiBookmark } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdPermMedia } from "react-icons/md";
import { HiOutlineTranslate } from "react-icons/hi";
import { GoListOrdered } from "react-icons/go";

const dashboardRoutes = [
  {
    path: "/damage-calculator",
    name: "Damage calculator",
    icon: ImCalculator,
    layout: "/tools",
  },
  {
    path: "/pokedex",
    name: "Pokedex",
    icon: GiBookmark,
    layout: "/tools",
  },
  {
    path: "/poke-ranking",
    name: "Pokemon Ranking",
    icon: GoListOrdered,
    layout: "/tools",
  },
  {
    path: "/poke-english",
    name: "Pokemon English",
    icon: HiOutlineTranslate,
    layout: "/tools",
  },
  {
    path: "/materials",
    name: "Materials",
    icon: MdPermMedia,
    layout: "/tools",
  },
  {
    path: "/about",
    name: "About @p0kem0nEmerald",
    icon: CgProfile,
    layout: "",
  },
];

export default dashboardRoutes;
