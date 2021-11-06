import logoURL from "./imageinfo"
import { Circle } from "better-react-spinkit"

function Loading() {
    return (
        <center>
            <div>
                <img
                src={logoURL}
                alt=""
                height={200}
                style={{marginBottom: 10}}
                />
                <Circle size={60} />
            </div>
        </center>
    )
}

export default Loading
