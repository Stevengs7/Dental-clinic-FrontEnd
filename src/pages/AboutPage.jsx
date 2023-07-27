import { Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function AboutPage() {
  const companyName = "Dental Clinic";
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography
            variant="h4"
            sx={{ mt: 10 }}
            fontWeight={500}
            gutterBottom
          >
            Values of Our Dental Care Company
          </Typography>
        </Stack>
        <Typography variant="subtitle1" gutterBottom>
          At {companyName}, our mission is to improve oral health and overall
          well-being of our patients by providing top-quality dental services.
          We believe in the significance of dental care and its impact on
          people's quality of life. Our core values reflect our dedication to
          excellence and unwavering commitment to patient satisfaction.
          <Typography variant="h6" gutterBottom>
            1. Professional Excellence:
          </Typography>
          <Typography variant="body1" gutterBottom>
            We strive forexcellence in everything we do. Our team of highly
            skilled and dedicated professionals is committed to staying updated
            with the latest dental technologies and practices to deliver the
            best possible care to our patients.
          </Typography>
          <Typography variant="h6" gutterBottom>
            2. Care and Compassion:
          </Typography>
          <Typography variant="body1" gutterBottom>
            We value the relationship we build with each patient and believe in
            the importance of listening and understanding their individual
            needs. We are committed to providing a warm and welcoming
            environment where every patient feels comfortable and secure during
            their visit.
          </Typography>
          <Typography variant="h6" gutterBottom>
            3.Integrity and Ethics:
          </Typography>
          <Typography variant="body1" gutterBottom>
            We operate our company with the highest standards of integrity and
            professional ethics. We endeavor to be transparent in our
            interactions with patients, providing them with clear and honest
            information about their dental treatments and associated costs.
          </Typography>
          <Typography variant="h6" gutterBottom>
            4. Innovation and Technology:
          </Typography>
          <Typography variant="body1" gutterBottom>
            We embrace innovation and technology in the field of dentistry. We
            constantly seek new ways to improve our services and enhance the
            patient experience through the use of cutting-edge equipment and
            state-of-the-art techniques.
          </Typography>
          <Typography variant="h6" gutterBottom>
            5. Social Responsibility:
          </Typography>
          <Typography variant="body1" gutterBottom>
            We recognize our responsibility to the community and the
            environment. We actively seek opportunities to contribute positively
            to our community and minimize our environmental impact through
            sustainable practices. At {companyName}, each team member is
            committed to these core values to ensure our patients receive
            exceptional and personalized care. We take pride in being a dental
            care company that goes above and beyond to make a difference in
            people's lives through a healthy and radiant smile.
          </Typography>
        </Typography>
        <Typography variant="h4" sx={{ mt: 10 }} fontWeight={500} gutterBottom>
          About Us
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          At {companyName}, we have been serving the community for over a decade
          with a comprehensive focus on oral health and overall well-being.
          Founded by M. Steven Garzón with a clear vision of providing
          outstanding dental care, our clinic has grown to become a leading name
          in the dental care world. Our team consists of a diverse group of
          highly skilled professionals who are passionate about their work. From
          our general dentists to our specialists and our friendly support
          staff, we all share the common goal of delivering an unparalleled
          patient experience. At {companyName}, we believe that every smile is
          unique and deserves personalized attention. We strive to listen to
          each patient, understand their concerns, and develop a tailored
          treatment plan that fits their specific needs and goals. Equipped with
          state-of-the-art technology, our clinic allows us to offer precise
          diagnoses and advanced treatments. Additionally, we maintain rigorous
          sterilization and safety standards to ensure our patients always feel
          safe and comfortable during their visits. We are committed to ongoing
          education and continuously updating our knowledge in dentistry to
          provide the most effective and modern treatments available. We believe
          that combining clinical experience with innovation is key to achieving
          outstanding results. At {companyName}, we not only care about our
          patients' dental health but also their overall well-being. We take
          pride in creating a warm and welcoming environment where everyone
          feels valued and at ease. Thank you for choosing {companyName} as your
          dental care provider. We look forward to being a part of your journey
          to a healthier smile and better quality of life. If you have any
          questions or wish to schedule an appointment, please do not hesitate
          to contact us. We hope to see you soon!
        </Typography>
      </Container>
    </>
  );
}
