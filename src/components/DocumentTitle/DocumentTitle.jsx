import { useEffect } from "react";

const DocumentTitle = ({ children }) => {
  useEffect(() => {
    document.title = children;
  }, [children]);

  return null;
};

export default DocumentTitle;
