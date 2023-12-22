import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from 'react-icons/fc'
import { saveUser } from "../../api/auth";

const Login = () => {
    const navigate = useNavigate()
    const { signIn,
        signInWithGoogle
        , updateUserProfile, loading, user } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const location = useLocation()
    const from = location?.state?.from?.pathname || "/";

    const onSubmit = async (data) => {

        const email = watch("email")
        const password = watch("password")
        const name = watch("name")
        const photo = watch("photo")
        try {
            // upload image
            // const imageData = await imgUpload(image)
            // regestration
            await signIn(email, password)
            toast.success('Login Successfull successful')
            navigate(from, { replace: true })
        }
        catch (error) {
            console.log(error);
            toast.error(error?.message)
        }

    }

    const handleGoogleSignIn = () => {
        try {
            signInWithGoogle()
                .then(res => {
                    console.log(res.user)
                    const userInfo = {
                        email: res.user?.email,
                        name: res.user?.displayName,
                        photo: res.user?.photoURL
                    }
                    saveUser(userInfo)
                    navigate(from, { replace: true })

                })
        }
        //   .then(result=>{
        //     saveUser(result?.user)
        //get token
        // getToken(result?.user?.email)


        catch (error) {
            console.log(error);
            toast.error(error?.message)
        }
    }


    // Log the specific properties of the File object


    // console.log(watch("photo")) // watch input value by passing the name of it

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                    <p className='text-sm text-gray-400'>Please Enter email and password</p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>

                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='email' className='block mb-2 text-sm'>
                                    Email address
                                </label></div>
                            <input
                                {...register("email", { required: true })}
                                placeholder="Enter Your Email Here"
                                type='email'
                                name='email'
                                id='email'

                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                            {errors.name && <span>This field is required</span>}
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                {...register("password", { required: true })}
                                placeholder="*******"
                                type='password'
                                name='password'
                                autoComplete='new-password'
                                id='password'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                            />
                            {errors.name && <span>This field is required</span>}
                        </div>
                    </div>


                    <div>
                        <button
                            type='submit'
                            className='bg-rose-500 w-full rounded-md py-3 text-white'
                        >
                            {loading ? (<TbFidgetSpinner className='animate-spin m-auto'></TbFidgetSpinner>) : ("Continue")}
                        </button>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Signup with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={handleGoogleSignIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don't have any account?{' '}
                    <Link
                        to='/signup'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        signup
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
};

export default Login;