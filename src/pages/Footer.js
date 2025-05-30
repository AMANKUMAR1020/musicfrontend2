import { FaGithubAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import "./style/HomePage.css";


export default function Footer(){  
  const d = new Date();
  let year = d.getFullYear();
  
      return(
        <>
        <div className="footbar">
          <button style={{background:'transparent', color:'gray'}} className="btn-type8">
            <a href="https://www.linkedin.com/in/aman-kumar-86062722b" rel="noreferrer" target="_blank">
              <FaLinkedin /> 
            <p className="text">Linkedin</p></a>
          </button>

          <button style={{background:'transparent', color:'gray'}} className="btn-type8">
            <a href="https://github.com/AMANKUMAR1020" rel="noreferrer" target="_blank">
                <FaGithubAlt />
            <p className="text">Github</p></a>
          </button>
    
          <button style={{background:'transparent', color:'gray'}} className="btn-type8">
            <a href="https://x.com/AMANKUMAR102030" rel="noreferrer" target="_blank">
              <BsTwitterX /> 
            <p className="text">Twitter</p></a>
          </button>
    
          <button style={{background:'transparent', color:'gray'}} className="btn-type8">
            <a href="https://leetcode.com/u/amankumar1020/" rel="noreferrer" target="_blank">
              <SiLeetcode />
            <p className="text">Leetcode</p></a>
          </button>
    </div>
    <p 
      className="text"
      style={{border: "none", padding:"10px", margin:"6px", borderRadius: "12px", backgroundColor: "rgb(238, 174, 202)"}}>
        Thank you visiting this website by amankumar1020 &nbsp;{ year }&nbsp;
    </p>
    </>)
  }