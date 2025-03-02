import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

export const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'ADMIN' })
        if (!existingAdmin) {
            const defaultAdmin = new User({
                name: 'Jose Miguel',
                surname: 'Pirir',
                email: 'jpirir@gmail.com',
                username: 'jpirir123',
                phone: '13429786',
                password: await encrypt('Hola123.'),
                role: 'ADMIN'
            })

            await defaultAdmin.save() 
            console.log("Default ADMIN user created successfully")
        } else {
            console.log("Default ADMIN user already exists")
        }
    } catch (err) {
        console.error("Error creating default ADMIN user", err)
    }
}

export const login = async(req, res)=>{
    try{

        let { userLoggin, password } = req.body

        let user = await User.findOne(
            {
                $or: [ 
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        ) 
        if(user && await checkPassword(user.password, password)) {
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Wrong email or password'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function'})
    }
}
