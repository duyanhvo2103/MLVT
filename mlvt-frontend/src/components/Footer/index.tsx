import { Grid, Box, Typography, Link, useTheme } from "@mui/material";
import { Facebook, MailOutline, LinkedIn, Phone } from "@mui/icons-material";
import Logo from "../../assets/mlvt_logo.png";
import React from "react";
import HCMUSLogo from "../../assets/fithcmus.png";

interface LinkItem {
  text: string;
  link: string;
}

const LinkSection: React.FC<{ title: string; links: LinkItem[] }> = ({
  title,
  links,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ padding: "1em 0.7em" }}>
      <Typography
        sx={{
          color: theme.palette.primary.main,
          fontFamily: "Poppins, sans-serif",
          fontSize: "1em",
          fontWeight: 600,
          paddingBottom: "0.5em",
        }}
      >
        {title}:
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
        {links.map((item: LinkItem, index: number) => (
          <Typography
            key={index}
            component="a"
            href={item.link}
            sx={{
              color: theme.palette.text.primary,
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.9em",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5em",
              "&:hover": { color: theme.palette.primary.main },
              "&::before": {
                content: "'•'",
                color: theme.palette.primary.main,
                fontSize: "1.5em",
                marginRight: "0.5em",
                lineHeight: "1",
              },
              fontWeight: 500,
            }}
          >
            {item.text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

const Footer: React.FC = () => {
  const resources: LinkItem[] = [
    { text: "Documentation", link: "/documentation" },
    { text: "Figma design", link: "/figma-design" },
    { text: "Sample", link: "/sample" },
    { text: "Tutorial video", link: "/tutorial-video" },
  ];

  const project: LinkItem[] = [
    { text: "About us", link: "/about-us" },
    { text: "Terms and conditions", link: "/terms-and-condition" },
    { text: "Privacy policy", link: "/privacy-policy" },
  ];
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.secondary.main}
      p={4}
      sx={{ paddingLeft: "3em" }}
    >
      <Grid container px={5}>
        {/* Logo and Description*/}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              // padding: "1em",
            }}
          >
            <img
              src={Logo}
              alt="MLVT"
              style={{ width: "10em", height: "10em" }}
            />
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontFamily: "Poppins, sans-serif",
                fontSize: "1em",
                fontWeight: 600,
              }}
            >
              Multi-language Video Translation
            </Typography>

            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontFamily: "Poppins, sans-serif",
                fontSize: "0.9em",
              }}
            >
              is a graduation project at University of Science - HCM City.
            </Typography>

            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontFamily: "Poppins, sans-serif",
                fontSize: "1em",
                fontWeight: 600,
                paddingTop: "1em",
              }}
            >
              Get in touch:
            </Typography>

            {/* icon section */}
            <Box
              mt={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5em",
              }}
            >
              <Box display="flex" gap={3}>
                <Link href="#" color="inherit">
                  <Facebook fontSize="large" />
                </Link>
                <Link href="mailto:example@mail.com" color="inherit">
                  <MailOutline fontSize="large" />
                </Link>
                <Link href="#" color="inherit">
                  <LinkedIn fontSize="large" />
                </Link>
              </Box>
              <Box display="flex" gap={0.7}>
                <Link href="tel:+8489496257" color="inherit">
                  <Phone fontSize="large" />
                </Link>
                <Typography
                  mt={1}
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "1em",
                    fontWeight: 600,
                  }}
                >
                  +84 89 496 257
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Resource Links */}
        <Grid item xs={12} md={4} pl={3}>
          <LinkSection title="Resource" links={resources} />
          <LinkSection title="Project" links={project} />
        </Grid>

        {/* Powered By */}
        <Grid item xs={12} md={4} sx={{ padding: "1em 0" }}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontFamily: "Poppins, San-sarif",
              fontSize: "1em",
              fontWeight: 600,
              paddingBottom: "0.5em",
            }}
          >
            Powered by:
          </Typography>

          <Box display="flex" mt={2}>
            <Box
              sx={{
                backgroundColor: theme.palette.secondary.contrastText,
                padding: "0.5em",
                borderRadius: "1em",
              }}
            >
              <img
                src={HCMUSLogo}
                alt="HCMUS"
                style={{ width: "auto", height: "4.65em" }}
              />
            </Box>
          </Box>
          <Box mt={2}>
            <Typography
              component="ul"
              sx={{
                color: theme.palette.text.primary,
                fontFamily: "Poppins, sans-serif",
                fontSize: "0.9em",
                textDecoration: "none",
                fontWeight: 500,
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: "0.5em" }}>
                HCMUS - Faculty of Information Technology
              </li>
              <li style={{ marginBottom: "0.5em" }}>
                227 Nguyen Van Cu Str., Ho Chi Minh City, Vietnam
              </li>
              <li>MLVT.HCMUS@gmail.com | +84 89 496 257</li>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default Footer;
