import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import React from 'react'
import bgImage from '../../assets/landing_page_background.png'
import { CustomButton } from '../../components/CustomButton'
import Footer from '../../components/LandingPageComponents/Footer'
import NavBar from '../../components/LandingPageComponents/NavBar'
import UpButton from '../../components/UpButton'
import AboutUsImage from './assets/about-us.png'
import OurMission from './assets/our-mission.png'

interface TeamMember {
    name: string
    role: string
    imageUrl: string
    bio?: string
}

const Section = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
}))

const SectionImage = styled('img')({
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
})

const teamData: TeamMember[] = [
    {
        name: 'Alice Wonderland',
        role: 'CEO & Founder',
        imageUrl:
            'https://imageio.forbes.com/specials-images/imageserve/646e6affb9a2a85595a62c39/0x0.jpg?format=jpg&crop=1573,1574,x239,y256,safe&height=416&width=416&fit=bounds',
    },
    {
        name: 'Bob The Builder',
        role: 'Head of Technology',
        imageUrl:
            'https://imageio.forbes.com/specials-images/imageserve/646e6affb9a2a85595a62c39/0x0.jpg?format=jpg&crop=1573,1574,x239,y256,safe&height=416&width=416&fit=bounds',
    },
    {
        name: 'Charlie Chaplin',
        role: 'Creative Director',
        imageUrl:
            'https://imageio.forbes.com/specials-images/imageserve/646e6affb9a2a85595a62c39/0x0.jpg?format=jpg&crop=1573,1574,x239,y256,safe&height=416&width=416&fit=bounds',
    },
    {
        name: 'Diana Prince',
        role: 'Marketing Lead',
        imageUrl:
            'https://imageio.forbes.com/specials-images/imageserve/646e6affb9a2a85595a62c39/0x0.jpg?format=jpg&crop=1573,1574,x239,y256,safe&height=416&width=416&fit=bounds',
    },
    {
        name: 'Edward Elric',
        role: 'Lead Developer',
        imageUrl:
            'https://imageio.forbes.com/specials-images/imageserve/646e6affb9a2a85595a62c39/0x0.jpg?format=jpg&crop=1573,1574,x239,y256,safe&height=416&width=416&fit=bounds',
    },
    {
        name: 'Fiona Gallagher',
        role: 'Project Manager',
        imageUrl:
            'https://imageio.forbes.com/specials-images/imageserve/646e6affb9a2a85595a62c39/0x0.jpg?format=jpg&crop=1573,1574,x239,y256,safe&height=416&width=416&fit=bounds',
    },
]

const AboutPage: React.FC = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
                backgroundRepeat: 'repeat-y',
                color: 'white',
                minHeight: '100vh',
            }}
        >
            <NavBar />
            <Box
                sx={{
                    paddingTop: theme.spacing(12),
                    paddingBottom: theme.spacing(5),
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h3"
                        component="h2"
                        gutterBottom
                        color={'#DDCCFF'}
                        sx={{
                            fontWeight: 'bold',
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        About Us
                    </Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{ mb: 3, fontFamily: 'Poppins, sans-serif' }}
                    >
                        Driving innovation and excellence in the digital
                        landscape.
                    </Typography>
                </Container>
            </Box>

            <Section>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <SectionImage
                                src={AboutUsImage}
                                alt="Our team working"
                                height={300}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h3"
                                component="h2"
                                gutterBottom
                                sx={{
                                    fontWeight: '600',
                                    fontFamily: 'Poppins, sans-serif',
                                }}
                            >
                                Who We Are
                            </Typography>
                            <Typography
                                variant="body1"
                                paragraph
                                fontFamily={'Poppins, sans-serif'}
                            >
                                Cup Agency is a dynamic and forward-thinking
                                digital solutions provider. We are a passionate
                                team of strategists, designers, developers, and
                                marketers dedicated to helping businesses thrive
                                in the ever-evolving digital world.
                            </Typography>
                            <Typography
                                variant="body1"
                                paragraph
                                fontFamily={'Poppins, sans-serif'}
                            >
                                Founded on the principles of creativity and
                                technological expertise, we partner with clients
                                of all sizes, from startups to established
                                enterprises, to deliver impactful results.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Section>

            {/* 3. Our Mission Section */}
            <Section>
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={6}
                        alignItems="center"
                        direction={{ xs: 'column-reverse', md: 'row' }}
                    >
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h3"
                                component="h2"
                                gutterBottom
                                sx={{
                                    fontWeight: '600',
                                    fontFamily: 'Poppins, sans-serif',
                                    textAlign: 'right',
                                }}
                            >
                                Our Mission
                            </Typography>
                            <Typography
                                variant="body1"
                                paragraph
                                fontFamily={'Poppins, sans-serif'}
                                textAlign="right"
                            >
                                Our mission is to empower businesses with
                                innovative and tailored digital solutions that
                                drive growth, enhance brand presence, and create
                                lasting value. We aim to be a trusted partner,
                                guiding our clients through the complexities of
                                the digital landscape with clarity and
                                expertise.
                            </Typography>
                            <Typography
                                variant="body1"
                                paragraph
                                fontFamily={'Poppins, sans-serif'}
                                textAlign="right"
                            >
                                We believe in the power of collaboration and are
                                committed to understanding your unique goals to
                                deliver strategies that truly resonate with your
                                audience and achieve measurable success.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SectionImage
                                src={OurMission}
                                alt="Our mission vision"
                                height={300}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Section>

            <Section>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        textAlign="center"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            mb: 4,
                            fontFamily: 'Poppins, sans-serif',
                            color: '#DDCCFF',
                        }}
                    >
                        Meet The Team
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            flexWrap: 'nowrap',
                            py: 2,
                            gap: theme.spacing(3),
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            '-ms-overflow-style': 'none',
                            'scrollbar-width': 'none',
                        }}
                    >
                        {teamData.map((member) => (
                            <Card
                                key={member.name}
                                sx={{
                                    minWidth: { xs: 260, sm: 280, md: 300 },
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    flexShrink: 0,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={member.imageUrl}
                                    alt={member.name}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent
                                    sx={{ textAlign: 'center', flexGrow: 1 }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{
                                            fontWeight: 500,
                                            fontFamily: 'Poppins, sans-serif',
                                        }}
                                    >
                                        {member.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontFamily: 'Poppins, sans-serif',
                                        }}
                                    >
                                        {member.role}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Section>

            <Box
                sx={{
                    py: 10,
                    textAlign: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        sx={{
                            fontWeight: '650',
                            fontFamily: 'Poppins, sans-serif',
                            mb: 2,
                        }}
                    >
                        Ready to grow your business with us?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ mb: 4, fontFamily: 'Poppins, sans-serif' }}
                    >
                        Let's discuss how our expertise can help you achieve
                        your digital goals. Get in touch today!
                    </Typography>
                    <CustomButton
                        text="Contact Us"
                        onClick={() =>
                            (window.location.href =
                                'mailto: nguyenthiminhminh.hcm@gmail.com')
                        }
                        sx={{
                            backgroundColor: '#7A2EFF',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#6a1b9a',
                            },
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    />
                </Container>
            </Box>
            <Footer />

            <UpButton />
        </Box>
    )
}

export default AboutPage
