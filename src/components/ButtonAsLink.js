import styled from 'styled-components';
const ButtonAsLink = styled.button` background: none;
color: red;
border: none;
      padding: 0;
      font: inherit;
      text-decoration: underline;
      cursor: pointer;
      :hover,
      :active {
        color: #004499;
      }
`;
export default ButtonAsLink;