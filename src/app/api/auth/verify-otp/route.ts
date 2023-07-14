import { TOtp, TVerifyOtp } from '@/types/types'
import userService from '@/services/user-service'
import { User } from '@prisma/client';
import otpService from '@/services/otp-service';
import hashService from '@/services/hash-service';

export async function POST(request: Request, response: Response) {
    let body: TVerifyOtp
    let user: User | null;

    // 1. check all fields are present
    try {
        body = await request.json()
    } catch (error) {
        return new Response(
            JSON.stringify(
                {
                    "message": "All fields are required,  Missing mandatory fields"
                }
            ),
            {
                status: 400,
            }
        )
    }

    const { email, otp, hash } = body
    if (!body! || !email || !otp || !hash) {
        return new Response(
            JSON.stringify(
                {
                    "message": "All fields are required,  Missing mandatory fields"
                }
            ),
            {
                status: 400,
            }
        )
    }

    // 2. validate otp
    const [receivedHash, expire_time] = hash.split('.')
    // 2.1. recreate otp from data
    const data: string = `${email}.${otp}.${expire_time}`  // hash = email + otp + expire_time 
    // 2.1. check expire_time
    if (Date.now() > +expire_time) {
        return new Response(
            JSON.stringify(
                {
                    "message": "OTP expired!"
                }
            ),
            {
                status: 410,
            }
        )
    }
    // 2.2.  verifyHashedOtp with recreate otp
    if (!hashService.verifyHashedOtp(receivedHash, data)) {
        return new Response(
            JSON.stringify(
                {
                    "message": "OTP expired!"
                }
            ),
            {
                status: 410,
            }
        )
    }

    // 3. check if user exists in the database
    try {
        user = await userService.findUser(email)
        if (!user) {
            // 4. if not then return 
            return new Response(
                JSON.stringify(
                    {
                        "message": "User with this email id does not exits"
                    }
                ),
                {
                    status: 422,
                }
            )
        } else {
            // 5. if present then update emailVerified
            user = await userService.updateUserVerification(user!)
        }
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify(
                {
                    "message": "Something went wrong, please try again."
                }
            ),
            {
                status: 500,
            }
        )
    }

    // 6. response
    return new Response(
        JSON.stringify(
            {
                "status": true,
                "user": {
                    id: user.id,
                    email: user.email,
                    image: user.image,
                    username: user.name,
                    emailVerified: user.emailVerified
                }
            }
        ),
        {
            status: 200,
        }
    )
}
