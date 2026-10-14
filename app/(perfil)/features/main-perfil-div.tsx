import Main_perfil_image from './profile-informations.tsx'
import Add_friend_button from './addFriend-button.tsx'


export default function Main_perfil_div() {
    return (
        <div className="w-full h-[46.4vh] mt-[90] bg-black flex items-center">
            <Main_perfil_image image='/CapsuleDraft.webp'/>
            <Add_friend_button />
        </div>
    )
}