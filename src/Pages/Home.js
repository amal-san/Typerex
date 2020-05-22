import React, { useState, useEffect } from 'react';
import '../index.css';
import auth from '../Components/auth';
import { FaGithub , FaReact } from "react-icons/fa";
import { GoRepoForked } from "react-icons/go";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import cogoToast from 'cogo-toast';
import LoadingShip from '../Components/ship_with_water.png'
import { ReactComponent as Logo } from  '../Components/typewriter.svg'





export function Home(props) {

	const[ isloggedin , setisloggedin] = useState(true)

	const history = useHistory();


	async function handleClick(e){ 
		e.preventDefault();
		const username = document.getElementById('uname').value;
    if(username){
    cogoToast.loading(<div><div> Log in processing.. </div> </div>).then(() => {
      cogoToast.success(
          <div>
            <div> Logged in successfully!</div>
          </div>,{ hideAfter:2},
      );
    });
  	await auth.login(username)
    		.then((data) => {
    			 localStorage.setItem('typerex_username',data.data.userAdd.username);
    			 localStorage.setItem('wpm',data.data.userAdd.wpm);
    			 
    			 props.history.push('/start')
    			})
    		.catch(e => console.log('home'))
      }
    else {
      cogoToast.error(
        <div>
          <div>Enter a username! </div>
        </div>,{hideAfter:1,heading: 'Error'},
      );
    }

	}

	  useEffect((props) => {
    var count = 0;
    var keys = new Array ("key_1","key_2","key_3","key_4","key_5","key_6","key_7","key_8","key_9","key_10",
      "key_11","key_12","key_13","key_14","key_15","key_16","key_17","key_18","key_19","key_19","key_20")

    setInterval(() => {
      if(count === 20)
        count=0;
      starAnimation(count);
      count++;
    },500)


    function starAnimation(count){
      setTimeout(() => {
        var num = Math.floor(Math.random() * 19 + 1);
        var constr = document.getElementById(keys[num]);
        try {
          if (constr.style.fill === 'rgb(53, 50, 62)'){
            constr.style.fill = 'orangered';
              constr.style.stroke = 'orangered';
          }
          else {
            constr.style.fill = 'rgb(53, 50, 62)';
              constr.style.stroke = 'rgb(53, 50, 62)';
          }
          
        
        }
        catch {

          return 0;
        }   
      },1)
    }

	  document.title='Typerex';
    document.getElementById('username').innerHTML = ' ';
    document.getElementById('user-wpm').innerHTML = ' ';


      const username = localStorage.getItem('typerex_username');
      auth.userInfo(username)
      .then(() => {
        history.push("/start");
      })
      .catch(e => {
      	setisloggedin(false)
      })

     
    
    },[]);




    
    let home = <>
    <div className="home-content">
    <div className="home-img" style={{width:'45%',height:"auto"}}>
      <Logo/>
    </div>
    
		<div className="home-card">
			<h1 style={{ color: "black" }}><span role='img'>⌨️ </span> Welcome to open-source typing platform <span>typerex</span></h1>
			<p className="main-p">
				Open source typing platfrom to find out your words per minute. Start the test with any username &nbsp;
   <span role='img'>🧡.</span>
			</p>
			<div className="login">
				<section>
					<h1 className="startheader">Let's Start </h1>
					<form className="form">
						<div className="form-div">
							<label className="form-label">
								Enter Username
							</label>
							<input
								id="uname"
								className="form-input"
								type="text"
							></input>
						</div>
					</form>
					<section
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<a  className="bubbly-button" onClick={handleClick}>
							START
						</a>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-end",
							}}
						>
							<h2>
								<a
									className="FaGithub"
									href="https://github.com/amal-san/Typerex"
								>
									<FaGithub />
								</a>
							</h2>
							<h2>
								<a className="FaFork" href="">
									<GoRepoForked />
								</a>
							</h2>
							<h2>
								<a className="FaReact" href="">
									<FaReact />
								</a>
							</h2>
							</div>
						</section>
					</section>
				</div>
			</div>
			</div>
			<div className="shapes">
				<span className="wrap">
					<div className="clip-1">
          </div>
				</span>
		     </div>
		    <section>
		</section>
		</>

    if (isloggedin) {
    	return (
    	<>
       <div className="home" style={{ height: "100vh",background:'white',margin:'0 auto',padding:'10%'}}>
          <div className='loading-main'>
            <img className="loading--image" src={LoadingShip} alt='ship'></img>
            <h2>Loading <span className='loading-span'> . </span><span className='loading-span'> . </span><span className='loading-span'> . </span></h2>
            </div>
          </div>
       
	        
			</>	
		);
    }
    else {
    	return (
    	<>
        <div className="home" style={{ height: "101vh",background:'orangered' }}>
            {home}
        </div> 
			</>
		);

    }	


    
}