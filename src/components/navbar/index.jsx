import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import data from '../../pages/context.json';

const Navbar = () => {
  const [dropdown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const dropdownHandler = (e) => {
    e.preventDefault();
    setDropDown(!dropdown);
  };
  useEffect(() => {
  const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropDown(!dropdown);
      }
  };

  // If the item is active (ie open) then listen for clicks
  if (dropdown) {
    window.addEventListener('click', pageClickEvent);
  }

  return () => {
    window.removeEventListener('click', pageClickEvent);
  };

    }, [dropdown]);

  return (
    <nav className="nav__container">
      <ul className={`nav__links`}>
        <h1 className="nav__header">
          <Link to="home" smooth={true} duration={500}>
            {data.name}
          </Link>
        </h1>
        <li className="nav__item">
          <a href={`mailto:${data.Contact.email}`}>Contact</a>
        </li>
        <li className="nav__item__drop">
          <a
            className={`dropdown${dropdown ? '__active' : ''}`}
            ref={dropdownRef}
            onMouseEnter={() => setDropDown(true)}
          >
            Social Media
            <div
              className={`dropdown__decoration${dropdown ? '__active' : ''}`}
            />
          </a>

          <SocialDrop
            state={dropdown}
            href={data.social.Instagram}
            blurb="Instagram"
          />
          <SocialDrop
            state={dropdown}
            href={data.social.LinkedIn}
            blurb="Linkedin"
          />
          <SocialDrop
            state={dropdown}
            href={data.social.Github}
            blurb="Github"
          />
          <SocialDrop
            state={dropdown}
            href={data.social.Photography}
            blurb="Photography"
          />
        </li>
        <li className="nav__item">
          <Link to="projects" smooth={true} duration={500}>
            Projects
          </Link>
        </li>
        <li className="nav__item">
          <Link to="about" smooth={true} duration={500}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const SocialDrop = (props) => {
  return (
    <li className={`dropdown__item${props.state ? '__active' : ''}`}>
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.blurb}
      </a>
    </li>
  );
};
export default Navbar;