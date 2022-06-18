import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyle from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";
import { getPostsData } from "../lib/post";
import Head from "next/head";

//SSGの実装
export async function getStaticProps() {
  const allPosrData = getPostsData();
  console.log(allPosrData);

  return {
    props: {
      allPosrData,
    },
  };
}

// //SSRの場合
// //context ユーザーがリクエストした情報
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops,
//     },
//   };
// }

export default function Home({ allPosrData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle} </title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>勉強中</p>
      </section>
      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPosrData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`} passHref>
                <img src={thumbnail} className={styles.thumbnailImage} alt="" />
              </Link>
              <Link href={`/posts/${id}`} passHref>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
