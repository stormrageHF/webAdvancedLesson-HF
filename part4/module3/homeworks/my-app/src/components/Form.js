import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Box,
  Image,
  useColorModeValue
} from "@chakra-ui/react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

import chakraUILight from "../assets/images/chakra-ui-light.png";
import chakraUIDark from '../assets/images/chakra-ui-dark.png';

export default function Form() {
  const bgColor = useColorModeValue('#fff', 'gray.700');
  const chakraUI = useColorModeValue(chakraUILight, chakraUIDark)
  return (
    <Box bgColor={bgColor} p={3} w="400px" mt="100px" mx="auto" boxShadow="0 0 8px rgb(0 0 0 / 10%)" borderRadius="lg" padding="50px 50px 30px">
      {/* <Image w="250px" mx="auto" mt="2" mb="6" src={chakraUI} /> */}
      <Tabs align="center">
        <TabList color="#969696" borderColor="transparent">
          <Tab _focus={{ boxShadow: "none" }} _selected={{ color: "#ea6f5a", borderColor: "#ea6f5a" }}>登录</Tab>
          <Tab _focus={{ boxShadow: "none" }} _selected={{ color: "#ea6f5a", borderColor: "#ea6f5a" }}>注册</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignIn />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
