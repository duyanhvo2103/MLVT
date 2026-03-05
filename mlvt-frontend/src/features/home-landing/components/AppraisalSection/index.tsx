import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { Box, Typography, Pagination } from "@mui/material";

import AppraisalCard from "./AppraisalCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const appraisalData = [
  {
    id: 1,
    imageSrc: "https://i.imgur.com/xJgqZ8k.png",
    title: "Certificate of Intellectual Property",
    subtitle: "National Office of Intellectual Property of Viet Nam",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (Certificate Description)",
    link: "#",
  },
  {
    id: 2,
    imageSrc: "https://i.imgur.com/D70g9q7.png",
    title: "Abstract Report on Enhancing Vietnamese Lip Sync",
    subtitle:
      "The Xth Scientific Conference, Faculty of Information Technology, VNU-HCM",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (Abstract Report Detailed)",
    link: "#",
  },
  {
    id: 3,
    imageSrc: "https://i.imgur.com/YfP2YhN.png",
    title: "Dr. Nguyen Ngoc Thao",
    subtitle: "Faculty of Information Technology, VNUHCM-University of Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (Lecturate Feedback)",
    link: "#",
  },
  {
    id: 4,
    imageSrc: "https://i.imgur.com/aO0l0uD.png",
    title: "MSc. Cao Xuan Nam",
    subtitle: "Faculty of Information Technology, VNUHCM-University of Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (Lecturate Feedback)",
    link: "#",
  },
  {
    id: 5,
    imageSrc: "https://i.imgur.com/X8sJkP7.png",
    title: "Feedback survey",
    subtitle: "Faculty of Information Technology, VNUHCM-University of Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (Feedback)",
    link: "#",
  },
];

const darkBg = "#12121F";
const textColor = "#E0E0E0";

const AppraisalSection: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = appraisalData.length;

  const settings = {
    dots: false,
    arrows: false,
    infinite: pageCount > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: pageCount > 1,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0px",
    initialSlide: 0,
    afterChange: (current: number) => {
      setCurrentPage(current);
    },
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value - 1);
    sliderRef.current?.slickGoTo(value - 1);
  };

  if (!appraisalData || pageCount === 0) {
    return (
      <Box
        sx={{
          backgroundColor: darkBg,
          color: textColor,
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
          }}
        >
          No appraisal items to display.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        color: textColor,
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        fontWeight="600"
        textAlign="left"
        sx={{
          mb: 3,
          ml: { xs: 0, md: 2 },
          fontSize: { xs: "2rem", md: "2.5rem" },
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Appraisal
      </Typography>
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: "90%", md: "800px" },
          mx: "auto",
          position: "relative",
        }}
      >
        <Slider ref={sliderRef} {...settings}>
          {appraisalData.map((item) => (
            <AppraisalCard
              key={item.id}
              imageSrc={item.imageSrc}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              link={item.link}
            />
          ))}
        </Slider>
      </Box>

      {pageCount > 1 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={2}
          sx={{ mt: 3 }}
        >
          <Pagination
            count={pageCount}
            page={currentPage + 1}
            onChange={handlePageChange}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
                backgroundColor: "transparent",
                borderRadius: 2,
                fontFamily: "Poppins, sans-serif",
                fontSize: "0.8em",
                fontWeight: 600,
                margin: "0 2px",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              },
              "& .MuiPaginationItem-ellipsis": {
                color: "white",
              },
              "& .MuiPaginationItem-previousNext": {
                color: "white",
                "&.Mui-disabled": {
                  color: "rgba(255, 255, 255, 0.3)",
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AppraisalSection;
