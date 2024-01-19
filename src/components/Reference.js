import { Label, Divider, Tooltip } from "@fluentui/react-components";

function Reference() {
    return (
        <>
            <div style={{ width: "300px" }}>
                <div style={{ height: "30px", width: "120px", backgroundColor: "#b16aaa", color: "#4f234b", fontSize: "16px", display: "flex", alignItems: "center", paddingLeft: "10px", justifyContent: "space-between", paddingRight: "10px" }}>
                    Reference
                </div>
                <div className="custom-scroll" style={{ padding: "7px", color: "#1565c0" }}>
                    <Tooltip relationship="label" content="Follow the photo instructions carefully as it will impact the accuracy of your score.">
                        <Divider style={{ padding: "8px", color: "#1565c0" }}>Photo Requirements</Divider>
                    </Tooltip>
                    <div style={{ paddingLeft: "10px" }}>
                        <Label size="small" style={{ color: "#1565c0" }}>Follow the photo instructions carefully.</Label>
                        <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                            <div>
                                <i classNameName="fa-solid fa-check" style={{ color: "#1565c0", paddingRight: "10px" }}> </i>
                                <Label size="small" style={{ color: "#1565c0" }}>Generally no selfies to ensure maximal accuracy. </Label>
                            </div>
                            <div>
                                <i classNameName="fa-solid fa-check" style={{ color: "#1565c0", paddingRight: "10px" }}> </i>
                                <Label size="small" style={{ color: "#1565c0" }}>Lens distortion will warp your facial features if the camera lens is too close.</Label>
                            </div>
                            <div>
                                <i classNameName="fa-solid fa-check" style={{ color: "#1565c0", paddingRight: "10px" }}> </i>
                                <Label size="small" style={{ color: "#1565c0" }}>Hair should not be covering the forehead or sides of the face.</Label>
                            </div>
                            <div>
                                <i classNameName="fa-solid fa-check" style={{ color: "#1565c0", paddingRight: "10px" }}> </i>
                                <Label size="small" style={{ color: "#1565c0" }}>Photo should be well lit and good quality for AI to detect landmarks accurately.</Label>
                            </div>
                            <div>
                                <i classNameName="fa-solid fa-check" style={{ color: "#1565c0", paddingRight: "10px" }}> </i>
                                <Label size="small" style={{ color: "#1565c0" }}>Face should be turned completely to the front and side for each respective photo.</Label>
                            </div>
                            <div>
                                <i classNameName="fa-solid fa-check" style={{ color: "#1565c0", paddingRight: "10px" }}> </i>
                                <Label size="small" style={{ color: "#1565c0" }}>Face should have a neutral expression (no smiling or excessive grinning).</Label>
                            </div>
                        </div>
                    </div>
                    <Divider style={{ padding: "8px", color: "#1565c0" }}><i classNameName="fa-solid fa-circle-exclamation fa-lg" style={{ color: "#1565c0" }} /></Divider>
                    <div style={{ paddingLeft: "10px" }}>
                        <Label size="medium" style={{ color: "#1565c0" }}>
                            <i className="fa-regular fa-clipboard" style={{ color: "#1565c0", paddingRight: "10px" }} />
                            Note:
                        </Label>
                        <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                            <div>
                                <Label size="small" style={{ color: "#1565c0" }}>
                                    &nbsp;&nbsp;&nbsp;Harmony only assesses your facial proportions, angles, and the relative positioning of features.
                                    &nbsp;&nbsp;It does not factor in features like hair color, skin color, eye color, skin health, and eye contrast, which can all play a role in facial attractiveness. <br />
                                    &nbsp;&nbsp;&nbsp;You can adjust your score accordingly based on those other factors.
                                    &nbsp;&nbsp;For example, if you have severe acne, your overall beauty score may be lower than your harmony score.
                                    &nbsp;&nbsp;Though, for the most part your harmony score should represent the majority of criteria that factor into beauty.
                                    &nbsp;&nbsp;Think of facial harmony as the foundation of beauty and the rest of your features sit on that foundation.
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reference;