import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getUserById } from "../services/userService"
import { jwtDecode } from "jwt-decode"

const useCheckRole = (currentUser) => {
  const navigate = useNavigate()
  const decode = jwtDecode(sessionStorage.getItem("accessToken"))

  useEffect(() => {
    const check = async () => {
      const response = await getUserById(currentUser?.id)
      const user = response.data
      const oldRole = decode.role

      console.log(user.role + " " + currentUser.role)

      if (user.role !== oldRole) {
        console.log("error")
        sessionStorage.clear()
        navigate("/")
      } else {
        console.log("success")
      }
    }

    if (currentUser?.id) check()
  }, [currentUser, navigate])
}

export default useCheckRole
