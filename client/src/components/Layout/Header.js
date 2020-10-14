import React from 'react';
import { Link } from "react-router-dom";
import AuthOptions from '../Auth/AuthOptions';
import { } from './Header.css';

export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">
          Phi Internal Project
        </h1>
      </Link>
      <AuthOptions />
    </header>
  )
}
