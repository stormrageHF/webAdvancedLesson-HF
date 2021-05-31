import React,{useState} from "react";
import {
  Input,
  InputGroup,
  Stack,
  InputLeftAddon,
  InputRightAddon,
  FormHelperText,
  RadioGroup,
  Radio,
  Select,
  Switch,
  FormLabel,
  Flex,
  Button,
  FormControl,
  Text,
  Link,
  InputLeftElement,
  ButtonGroup,
  Box
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaCheck, FaMobileAlt } from "react-icons/fa";
import { useFormik } from "formik"
import { signUp } from "./Api"

export default function SignUp() {
  const [ state, setState ] = useState({ isLoading: false })
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: values => {
      setState({...state, isLoading: true})
      signUp(values).then(res => {
        console.log(res);
        localStorage.sign_token = res.data.user.token
        setState({...state, isLoading: false})
        alert("注册成功")
      }).catch(error => {
        setState({...state, isLoading: false})
      })
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing="0">
        <InputGroup>
          <InputLeftElement
            top="6px" position="absolute"
            pointerEvents="none"
            children={<FaUserAlt color="#969696" />}
          />
          <Input
            focusBorderColor="1px solid #c8c8c8" h="50px" p="4px 12px 4px 35px"
            border="1px solid #c8c8c8" borderRadius="4px 4px 0 0" backgroundColor="hsla(0,0%,71%,.1)"
            placeholder="你的昵称" name="username" value={formik.values.username} onChange={formik.handleChange}  />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            top="6px" position="absolute"
            pointerEvents="none"
            children={<FaMobileAlt color="#969696" />}
          />
          <Input
            focusBorderColor="1px solid #c8c8c8" h="50px" p="4px 12px 4px 35px"
            border="1px solid #c8c8c8" borderRadius="0" backgroundColor="hsla(0,0%,71%,.1)"
            borderTopColor="transparent" borderBottomColor="transparent"
            placeholder="邮箱" name="email" value={formik.values.email} onChange={formik.handleChange}  />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            top="6px" position="absolute"
            pointerEvents="none"
            children={<FaLock color="#969696" />}
          />
          <Input
            focusBorderColor="1px solid #c8c8c8" h="50px" p="4px 12px 4px 35px"
            border="1px solid #c8c8c8" borderRadius="0 0 4px 4px" backgroundColor="hsla(0,0%,71%,.1)"
            type="password" placeholder="设置密码" name="password" value={formik.values.password} onChange={formik.handleChange}  />
        </InputGroup>
      </Stack>
      <Box marginTop="20px">
        <Button type="submit" _hover={{ bgColor: "#3db922" }} bgColor="#42c02e" w="100%" colorScheme="teal" borderRadius="25px"
        isLoading={state.isLoading} loadingText="注册中">
          注册
        </Button>
        <Text fontSize="xs" color="#969696" mt="15px">
          点击 “注册” 即表示您同意并愿意遵守简书<br /><Link textDecoration="none" outline="2px solid transparent" target="_blank" color="#3194d0" href="https://www.jianshu.com/p/c44d171298ce">用户协议</Link> 和 <Link color=
            "#3194d0" href="https://www.jianshu.com/p/2ov8x3" target="_blank" textDecoration="none" outline="2px solid transparent">隐私政策</Link> 。
        </Text>
      </Box>
    </form>
  );
}
