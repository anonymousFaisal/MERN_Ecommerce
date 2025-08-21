import React from "react";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import LegalContents from "./../components/features/LegalContents";
import useFeatureStore from "../store/useFeatureStore";

const ContactPage = () => {
  const { fetchLegalDetails } = useFeatureStore();

  useEffect(() => {
    (async () => {
      try {
        await fetchLegalDetails("contact");
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <LegalContents />
    </Layout>
  );
};

export default ContactPage;
