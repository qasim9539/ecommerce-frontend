import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { Button, Link, Typography } from "@mui/material";
import { Grid } from "@mui/material";
// import { Link } from "react-alice-carousel";

const Footer = () => {
    return (
        <div>
            <Grid
                className="bg-[#161880] text-white text-center mt-10"
                container
                sx={{ bgcolor: ["#161880"], color: "white", py: 3 }}
            >
                <Grid item xs={12} sm={6} md={3}>
                    <Typography className="pb-5" variant="h6">
                        Company
                    </Typography>
                    <div>
                        {" "}
                        <Button className="pb-5" variant="h6" gutterBottom>
                            About
                        </Button>
                    </div>
                    <div>
                        {" "}
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Blog
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Press
                        </Button>
                    </div>
                    <div>
                        {" "}
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Jobs
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Partners
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography className="pb-5" variant="h6">
                        Solutions
                    </Typography>
                    <div>
                        {" "}
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Marketing
                        </Button>
                    </div>
                    <div>
                        {" "}
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Analytics
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Ecommerce
                        </Button>
                    </div>
                    <div>
                        {" "}
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Insights
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Support
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography className="pb-5" variant="h6">
                        Documentaton
                    </Typography>
                    <div>
                        {" "}
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Guide
                        </Button>
                    </div>
                    <div>
                        {" "}
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Api status
                        </Button>
                    </div>

                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography className="pb-5" variant="h6">
                        Legal
                    </Typography>
                    <div>
                        {" "}
                        <Button className="pb-5" variant="h6" gutterBottom>
                            About
                        </Button>
                    </div>
                    <div>
                        {" "}
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Claim
                        </Button>
                    </div>
                    <div>
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Privacy
                        </Button>
                    </div>
                    <div>
                        {" "}
                        <Button className="pb-5" variant="h6" gutterBottom>
                            Terms
                        </Button>
                    </div>

                </Grid>
                <Grid className="pt-20 " item xs={12}>
                    <Typography>Copyright © 2025, All Rights Reserved</Typography>
                    <Typography>Made By Qasim Gardezi</Typography>
                    <div className='flex items-center gap-4 justify-center text-2xl'>
                        <a href='https://www.facebook.com/profile.php?id=100048860740322' className='hover:text-primary-100'>
                            <FaFacebook />
                        </a>
                        <a href='https://www.instagram.com/syed_qasim_gardezi/'  className='hover:text-primary-100'>
                            <FaInstagram />
                        </a>
                        <a href='https://www.linkedin.com/in/qasim-gardezi-23ab392b7/' className='hover:text-primary-100'>
                            <FaLinkedin />
                        </a>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer;
