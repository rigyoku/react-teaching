import { signIn, signOut, useSession } from "next-auth/react"; // 未使用引用
export default () => {
    const a ={b:1,c:2} // 空格,分号,
    const { b, c } = a; // 未使用变量
    // 对齐
        return <div>
        {b}
    </div>;
};