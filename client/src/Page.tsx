import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content"

export default function Page() {
    return (
        <div className="flex justify-between flex-col h-full w-full">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}