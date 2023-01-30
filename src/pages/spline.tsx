import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/spline/Scene"), { ssr: false })
const Overlay = dynamic(() => import("@/components/spline/Overlay").then((mod) => mod.Overlay), { ssr: false });

export default function Spline() {
    const scroll = useRef(0);
    return (
        <>
            <div style={{ height: '100vh' }}>
                <Canvas shadows flat linear>
                    <Suspense fallback={null}>
                        <Scene scroll={scroll} />
                    </Suspense>
                </Canvas>
            </div>
            <Suspense fallback={null}>
                <Overlay scroll={scroll} />
            </Suspense>
        </>
    );
}
