import React, { useState } from "react";
import {
  Input,
  InputGroup,
  Stack,
  InputLeftAddon,
  InputRightAddon,
  FormHelperText,
  Button,
  FormControl,
  Checkbox,
  CheckboxGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaCheck } from "react-icons/fa";
import { useFormik } from "formik"
import { login } from "./Api"

export default function SignIn() {
  const [checked, setChecked] = useState(true)
  let obj = {
    username: "",
    password: "",
  }
  if (checked && localStorage.user_info) {
    obj = JSON.parse(localStorage.user_info)
  }
  const [state, setState] = useState({ isLoading: false })
  const formik = useFormik({
    initialValues: {
      ...obj
    },
    onSubmit: values => {
      setState({ ...state, isLoading: true })
      login(values).then(res => {
        console.log(res);
        setState({ ...state, isLoading: false })
        alert("登录成功")
      }).catch(error => {
        setState({ ...state, isLoading: false })
      })
    }
  })
  const handleUserChange = e => {
    formik.handleChange(e)
    // console.log(e.target.value);
    if (checked) {
      localStorage.user_info = JSON.stringify({ ...formik.values, "username": e.target.value })
    } else {
      localStorage.user_info = ""
    }
  }
  const handlePassChange = e => {
    formik.handleChange(e)
    if (checked) {
      localStorage.user_info = JSON.stringify({ ...formik.values, "password": e.target.value })
    } else {
      localStorage.user_info = ""
    }
  }
  const remenberMe = event => {
    setChecked(checked => {
      if (event.target.checked) {
        localStorage.user_info = JSON.stringify(formik.values)
      } else {
        localStorage.user_info = ""
      }
      return event.target.checked
    })
  }
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
            placeholder="手机号或邮箱" name="username" value={formik.values.username} onChange={handleUserChange} />
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
            borderTopColor="transparent"
            type="password" placeholder="密码" name="password" value={formik.values.password} onChange={handlePassChange} />
        </InputGroup>
      </Stack>
      <Stack spacing="3" mt="20px">
        <CheckboxGroup>
          <Checkbox defaultIsChecked={checked} onChange={remenberMe}>记住我</Checkbox>
        </CheckboxGroup>
        <Button
          type="submit" _hover={{ bgColor: "#187cb7" }} bgColor="#3194d0" w="100%"
          colorScheme="teal" borderRadius="25px"
          isLoading={state.isLoading} loadingText="登录中">
          登录
        </Button>
      </Stack>
    </form>
  );
}
