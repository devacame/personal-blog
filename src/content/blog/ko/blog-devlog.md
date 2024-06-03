---
isDraft: false
title: 블로그 개발기 | Astro + Tailwind
description: Astro Framework와 Tailwind 스타일을 사용한 이 블로그 개발기
pubDate: May 31, 2024
updatedDate: June 3, 2024
language: ko
tags: ['WebDev', 'Project', 'Devlog', 'Astro', 'Tailwind']
---

## Table of Contents

## 블로그를 직접 개발한 이유

사실 이번이 처음 블로그를 개발한 것은 아닌데 지난 번에는 Next.js로 개발했다가 그 다음에 학업으로 바빠서 업데이트를 안했더니 13이랑 14버전이 너무 금방 나와서(이래서 웹개발은 몇개월이면 뒤쳐지는 느낌이...) 다시 만들려고 마음먹고 인기있는 Astro로 개발하게 되었습니다.

이미 블로그 플랫폼은 네이버, 티스토리, Velog, 미디엄, Dev.to 등등 다양하게 있고 깃허브 페이지로 블로그를 올리시는 분들도 많지만 그래도 직접 개발하는 낭만에 빠져 만들어봤습니다.

조금 긴 글이 되겠지만 재미있게 봐주셨으면 좋겠습니다 :)

## (디테일한) 기술 스택

### [Astro](https://astro.build)

-   가장 근간이 되는 웹 프레임워크로 컨텐츠 중심을 강조합니다.
-   마크다운/MDX를 공식 지원하고 다른 자바스크립트 라이브러리(React 등)를 사용하기도 간편합니다.
-   아래는 Astro에서 사용한 플러그인들입니다.
    | 이름 | 목적 |
    |-----|-----|
    |mdx|MDX 파일 지원|
    |tailwind|Tailwind 공식 지원 플러그인|
    |react|[satori](https://github.com/vercel/satori) 사용을 위해 추가한 플러그인|
    |sitemap|사이트맵 생성 플러그인|
    |rss|RSS 생성을 위한 플러그인|
    |[astro-pagefind](https://github.com/shishkin/astro-pagefind)|PageFind 검색 기능을 추가하는 플러그인|
-   또한, Astro 플러그인은 아니지만 네비게이션 바를 편리하게 만들 수 있는 [Astro Navbar](https://github.com/surjithctly/astro-navbar) 패키지를 사용하였습니다.

### [Tailwind](https://tailwindcss.com)

-   HTML 클래스로 간편하게 스타일링을 할 수 있는 프레임워크로 CSS를 못하는 저에게 큰 도움이 되었습니다.
-   특히 [타이포그래피 플러그인](https://github.com/tailwindlabs/tailwindcss-typography)은 간단히 헤딩, 문단, 리스트, 테이블 등의 기본적인 HTML 요소에 대한 스타일링을 할 수 있어 저는 배치만 하면 되는 편리한 공식 플러그인입니다. (물론 배치가 제일 짜증난다고 생각합니다)

### [Markdown](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4)

-   개발자 분들은 README 파일 때문이라도 마크다운에 대해 접해보신 경우가 많으실 겁니다. 아래는 사용한 플러그인들 입니다.
    | 이름 | 목적 |
    |-----|-----|
    |[RemarkTOC](https://github.com/remarkjs/remark-toc)|목차 생성 플러그인|
    |[Remark Normalize Headings](https://github.com/remarkjs/remark-normalize-headings)|소제목들을 알맞는 헤딩으로 변환해주는 플러그인(예: h2 바로 아래에 h4가 있었다면 h4를 h3로 바꿔줌)|
    |[Remark Math](https://github.com/remarkjs/remark-math) & [Rehype Katex](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex)|[Katex](https://katex.org/)를 렌더링해야 할 경우를 위한 플러그인|

### [Satori](https://github.com/vercel/satori)

-   자동으로 [오픈그래프](https://ogp.me/) 사진을 만들기 위한 사용한 Vercel의 사토리 라이브러리로 HTML을 SVG로 만들어줍니다.
-   제 블로그의 모든 대표 이미지(이 글의 맨 위에 있는 이미지)들는 [Astro-Paper](https://github.com/satnaing/astro-paper) 템플릿과 [이 블로그 포스트](https://jafaraziz.com/blog/generate-open-graph-images-with-astro-and-satori/)를 참고하여 모두 Satori로 자동 생성한 이미지들입니다.

### [Pagefind](https://pagefind.app/)

-   Astro 플러그인에 적힌 것처럼 Pagefind를 사용하여 검색 기능을 추가하였습니다.
-   Pagefind는 정적 검색 라이브러리로 한글을 지원하고 라이브러리 크기도 크지 않은 라이브러리라 원래 사용하던 [fuse.js](https://fusejs.io/)에서 넘어오게 되었습니다.(사실 아래 이유가 더 큽니다)
-   해당 플러그인은 기본적인 UI까지 제공하기 때문에 간단히 임포트하여 요소를 추가하는 것만으로 사용할 수 있다는 편리함이 있습니다.
    ```js
    import { default as SearchFind } from 'astro-pagefind/components/Search'
    ```

## 개발 전/중 고려한 사항들

블로그를 자주 접하고 또 작성하는 입장에서 몇가지 필수 요소들과 제 상황에 따른 특수 요소들은 다음과 같았습니다.

### 필수 요소들

1. 개별 시리즈 및 태그 페이지
2. 검색 기능
3. RSS 피드
4. 다크모드
5. 모바일 지원(정확히는 모바일 기준으로 만들고 나머지 사이즈를 나중에 지원했습니다.)

### 특수 요소들

1. 다국어 지원
    - 유학생이라 영문으로 글 쓸이 더 많지만 한글로도 글을 쓰고 싶어 어떻게 보면 필수 요소였습니다.
2. 수학 렌더링(katex) 지원
3. 로그인이 필요없는 댓글
    - 개발 관련 글이 대부분이라 [giscus](https://giscus.app/)를 쓰면 더 편했겠지만 유학생활에 대한 내용들은 개발자분들 외에도 질문이 있을 것 같아서 로그인을 하지 않아도 댓글을 달 수 있는 서비스가 필요했습니다.

## 개발 과정

이 블로그는 4/14/2024에 시작하여 5/20/2024에 마무리하였습니다.

전체적인 과정은 다음과 같습니다.

1. 블로그 글 페이지
2. 편의 기능 추가(검색, 사이트 조작 버튼, 댓글)
3. 다국어 지원 및 기타 페이지 개발
4. 스타일링 마무리 (다크모드 및 큰 화면 지원)
5. RSS 피드와 오픈그래프 기능 추가

### 블로그 글 페이지 (및 기타 페이지) 개발

제 블로그의 모든 페이지는 GeneralLayout이라는 레이아웃 파일을 기반으로 구성되는데 이는 계속 화면 위에 붙어있는 **네비게이션 바**와 페이지 맨 아래의 **하단 푸터**, 그리고 화면 오른쪽 아래의 **사이트 조작 버튼**을 기본으로 그 안에 메인 내용을 포함하는 식입니다.

네비게이션 바는 위에서 언급했듯이 Astro-navbar 패키지를 이용하지만 원래는 직접 `navbar`를 써서 만들었었습니다. 바꾼 이유는 바 안의 드랍다운을 더 깔끔하게 만들고 싶어서입니다.

이렇게 레이아웃을 마무리한 후에 블로그 페이지를 만들었습니다. 사실 템플릿에서 스타일링 말고는 크게 변경한 것은 없지만 포스트 맨 위의 시리즈와 맨 아래의 태그들을 추가하고 그에 맞는 페이지들을 생성해 주었습니다.

다행히도 기본적인 페이지 개발에는 큰 문제가 없었습니다.(생기는게 더 이상하죠)

### 편의 기능들 (검색, 사이트 조작 버튼, 댓글)

#### 검색

검색은 앞서 언급한 것처럼 astro-pagefind 라이브러리를 통해 UI를 추가해서 구현되었습니다.

스타일링은 해당 라이브러리를 사용한 블로그들에서 사용했다는 CSS 변수들을 가져와서 일일이 무슨 역할인지 확인해보고 아래와 같이 설정했습니다.

```css
html.light {
	--pagefind-ui-scale: 1;
	--pagefind-ui-primary: #76abae;
	--pagefind-ui-text: #222831;
	--pagefind-ui-message-text: #000000;
	--pagefind-ui-result-title-text: #222831;
	--pagefind-ui-result-text: #000000;
	--pagefind-ui-background: #ffffff;
	--pagefind-input-background: #ffffff;
	--pagefind-ui-border: #bfcfe7;
	--pagefind-ui-border-width: 2px;
	--pagefind-ui-border-radius: 13px;
	--pagefind-ui-tag: #176b87;
	--pagefind-button-background: var(--pagefind-input-background);
	--pagefind-button-color: var(--pagefind-ui-message-text);
}
html.dark {
	--pagefind-ui-scale: 1;
	--pagefind-ui-primary: #76abae;
	--pagefind-ui-text: #eeeeee;
	--pagefind-ui-message-text: var(--pagefind-ui-text);
	--pagefind-ui-result-title-text: #f0ece5;
	--pagefind-ui-result-text: #f0ece5;
	--pagefind-ui-background: #000000;
	--pagefind-input-background: #000000;
	--pagefind-ui-border: #bfcfe7;
	--pagefind-ui-border-width: 2px;
	--pagefind-ui-border-radius: 13px;
	--pagefind-ui-tag: #176b87;
}
```

#### 사이트 조작 버튼

이 기능은 개인적으로는 모든 사이트에 있었으면 좋겠는데 없어서 [Vimium](https://chromewebstore.google.com/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=ko)을 쓰고 있는 사이트 조작입니다.

페이지의 맨 위/아래를 이동하는 버튼과 다크모드 토글, 그리고 제 블로그에는 필수인 언어 바꿈 버튼으로 구성되어있는 이 버튼은 제가 Astro에 가지고 있는 불만의 시작점입니다.

처음에는 Tailwind의 peer 클래스를 통해 포커스 시 다른 버튼들이 보이도록 CSS만으로 구동되는 방식이었습니다만...CSS의 주적이었던 IE가 사라지니 메인 빌런으로 부상한 사파리에서 이 방식이 작동하지 않아 결국 자바스크립트로 클래스 토글을 통해 작동하게 되었습니다. (그럼에도 사파리에서는 자동으로 버튼들이 사라지지 않습니다. 그 이벤트가 작동을 안하더라고요...)

이 부분과 실제 조작 버튼들의 구동방식에서 Astro에 대한 불만이 발생하는데, 스크립트 태그를 처리하는데 약간 문제가 있는 것을 확인하게 되었습니다.

버튼들은 이벤트 리스너를 통해 작동하는데, 테스트 중에 리스너의 함수가 가끔씩 작동을 안하는 것부터 어떤 document 함수들은 아예 실행되지 않아서 디버깅하는데 시간을 좀 잡아먹었습니다. (빌드 서버는 문제가 없더라고요)

그리고 가장 큰 문제는 바로 **ViewTransition**과의 연동성이 최악이라는 점이었습니다.
ViewTransition은 사이트 내에서 페이지 이동시 공통 요소들을 다시 렌더하지 않고 이동시키는 애니메이션을 통해 사용자 경험을 증가시키는 Astro 기능입니다.

그런데 사이트 조작 버튼들은 전부 페이지에 관계없이 존재하다보니 컴포넌트 안의 스크립트 태그들이 여러번 작동하는건지 뭔가 충돌이 일어나는지 페이지 이동 시에 리스너들이 하나같이 다 작동을 하지 않았습니다.(아직도 미스터리입니다)

물론 Astro 문서에는 ViewTransition 사용시 스크립트를 어떻게 사용해야 하는지가 기술되어 있으며 스택오버플로우 등에도 여러 답변이 있었습니다만 하나도 안 통하길래 결국 다시 원복을 시켰습니다. (근데 ViewTransition 쓰니까 깔끔하긴 해서 버그인지 뭔지는 몰라도 개선되었으면 좋겠네요...)

-   추가로 서술하자면 Astro는 기본적으로 스크립트 태그를 정적 생성 시에 실행하고 빌드 후 페이지에는 스크립트 내용이 들어가지 않습니다. 아마 이 과정에서 내부적으로 무슨 문제가 발생한 것으로 추측 중입니다.

#### 댓글

앞서 로그인이 필요없는 댓글이 필요했다고 적었는데, 사실 한가지 조건이 더 필요했습니다. 바로 **다크모드 스타일링**이었죠.

사실 giscus같은 경우는 알아서 되기 때문에 별 생각을 안했는데 처음에 도입했던 댓글 서비스인 [ConvoComet](https://convocomet.dev/)은 티스토리 기본 댓글처럼 닉네임 넣고 댓글을 작성할 수 있는 간단한 서비스였습니다.
문제는 아래와 같은 코드에서 `data-theme`을 바꾸는 것만으로는 바로 다크모드 전환이 되지 않아서 페이지를 리로딩하지 않는 이상 스타일링이 안되더라고요. (이런 식으로 스크립트로 넣는 컴포넌트들은 iframe안에 있어서 개별 스타일링이 안됩니다)

```html
<div
	id="convocomet-widget"
	data-page="YOUR_PAGE_ID"
	data-site="YOUR_SITE_ID"
	data-theme="YOUR_THEME"
></div>
<script src="https://convocomet.dev/widget.js" async></script>
```

그래서 다른 서비스들을 찾다가 발견한 것이 [Chirpy](https://chirpy.dev/)였습니다. 얘도 비슷하게 작동하지만 `data-chirpy-theme`를 조정하면 바로 다크모드 전환이 가능해서 다른 고민없이 얘로 결정하게 되었습니다.

추가로 원래 계획은 Vercel같은 데에다가 호스팅할 수 있으면 그러고 싶었지만 마땅한 프로젝트가 안보여서 일단 이걸로 가다가 나중에 직접 개발하거나 다른 프로젝트를 발견하면 옮길 계획입니다.

### 다국어 지원

다국어 지원은 Astro가 i18n 지원이 있어서 쉽게 갈 수 있었습니다...라고 하면 거짓말입니다.

Astro의 페이지 라우팅 방식을 고려했을 때 다국어 지원은 두가지 방법으로 가능합니다.

1. 각 언어별로 폴더를 만든다
2. 매개변수 폴더(예: [lang]/[post].astro)로 한 폴더 해결한다.

그리고 저는 1로 개발했다가 2로 옮겼습니다...

```bash
# 1번 방식
pages/
    en/
        index.astro
        about.astro
        tags/
            index.astro
            [tag].astro
    ko/
        index.astro
        about.astro
        tags/
            index.astro
            [tag].astro
    index.astro
    [slug].astro # 블로그 포스트 페이지
    404.astro
```

```bash
# 2번 방식
pages/
    [lang]/
        index.astro
        about.astro
        posts/
            [slug].astro # 블로그 포스트 페이지
        search.astro
    index.astro
    404.astro
```

보다시피 1번으로 하면 같은 파일이 두 개씩 생기니 너무 비효율적인거 같아 수정하게 되었습니다.

그런데 사실 이 부분은 어려운 부분이 아니었습니다. (그냥 파일에 언어별로 텍스트 설정하고 getStaticPaths만 잘 설정하면 되니까요)

문제는 저 폴더 안에 들어있지 않은, 1번 방식의 404.astro에서 발생했습니다. Astro는 `astro.config.mjs`로 설정하게 되는데 여기서 아래 `prefixDefaultLocale`가 문제가 되었습니다.

```js
i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ko'],
		routing: {
			prefixDefaultLocale: false,
			redirectToDefaultLocale: true,
		},
	},
```

저 부분을 `true`로 설정하면 404.astro뿐만 아니라 같은 레벨의 페이지들이 모두 렌더가 안되는 현상이 일어났습니다.
ViewTransition과는 다르게 이건 무조건 필요한 부분이기 때문에 깃허브에 이슈를 넣으려고 하다 [이 이슈](https://github.com/withastro/astro/issues/11011)를 찾게 되었습니다.
이슈는 클로즈되었지만 사실 해결이 안된 상태인데 저는 `false`로 설정하니 해결이 되어서 Astro의 라우팅 부분이 i18n 관련 부분과 충돌이 있는 것 같습니다.

그러면 저게 왜 필요한가 싶으실텐데, i18n 관련 기능 중에 `getRelativeUrl`이라고 어떤 페이지의 다른 언어 버전 url을 반환하는 함수가 있는데 저는 워크플로우 상 저걸 쓰지 않고 직접 하나하나 설정을 하는게 더 편해서 그랬지만 저 함수를 써서 개발하시는 분들은 조금 골치아파지실 수 있습니다.

***06/03/2024 업데이트***

한글로된 시리즈/태그 이름이 오픈그래프 이미지를 생성할 시에 한글이 URL 인코딩되어 getStaticPath에 제대로 등록되지 않아 빌드가 되지 않는 문제가 생겼습니다.

이를 해결하기 위해 [hangul-util 라이브러리](https://github.com/hyukson/hangul-util)의 `normalize`함수를 통해 한글을 영문으로 변환하는 구조로 코드를 바꿨습니다.

#### 스타일링

Tailwind는 신입니다.

저처럼 디자인 쪽에 감각이 없고 CSS를 싫어하시는 분들에게는 Tailwind는 정말 가뭄 속 단비같은 존재로 다크모드는 `dark:[]`, 화면 별 디자인은 `sm:[] md:[] lg:[]`로 간단히 할 수 있고 기본 색상도 풍부해 정말 쓰기 좋은 라이브러리입니다.

그래서 스타일링 쪽은 ~~sticky와 배치빼고는~~ 사실 별로 문제는 없었고 최대한 깔끔하게 하려고 노력해봤습니다. (그래도 어딘가 아쉬워서 나중에 Astro-Paper 스타일로 바꿀까도 싶은데...의견 있으시면 댓글로 달아주세요!)

한가지 말하자면 컴퓨터 모니터처럼 큰 화면에서도 최대 글 너비는 1080px인데 이는 기존 템플릿 영향도 있지만 페이지를 최대로 쓰면 블로그는 난잡해보여서 그렇습니다.

#### RSS와 오픈그래프

제 블로그의 하단에는 RSS 피드 페이지로 가는 버튼이 있습니다.

저는 RSS를 자주 사용하고 굉장히 편리하다고 생각하는데 제 주변에는 잘 사용하는 사람이 없더라고요. (잘 모르는 경우가 대다수)

그래도 편리성을 위해서라면 블로그에는 꼭 있어야한다고 생각하기 때문에 Astro가 제공하는 플러그인을 통해서 각 언어 및 통합 피드를 만들어두었습니다.

-   만약 태그별 혹은 시리즈별 피드도 추가하는 게 좋다고 생각하시면 댓글 남겨주세요!

오픈그래프같은 경우는 템플릿에 head부분에 관련 태그들이 추가되어있길래 사실 별 생각이 없었는데, 제가 개발한 사이트들을 친구들과 공유할때 대표 이미지가 없으면 좀 밋밋해보이는 경우가 있어서 어떻게하면 좀 자동화할 수 있을까를 고민하다 satori가 떠올라서 막 개발한 케이스입니다. (이걸로 블로그 글 대표이미지도 퉁칠 수 있는게 제일 좋습니다)

## 기타

### 폰트

저는 폰트에 대해 자세히 알지는 못하지만 그래도 깔끔하고 긴 글에 보기 편한 폰트를 찾다가 [스포카 한 산스 네오](https://spoqa.github.io/spoqa-han-sans/ko-KR/)를 찾고 난 뒤로는 이 폰트만 사용하고 있습니다.

### 여담

블로그를 얼마나 꾸준히 쓸지는 모르겠지만 열심히 만들었으니 열심히 노력해보려고 합니다.(사실 노력과 사용은 상관관계가 없습니다 ㅋㅋㅋ)

개발 일지랑 컴퓨터과학과 더불어 유학 생활도 올려보려하니 재밌게 봐주시면 감사하겠습니다!

## [블로그 깃허브](https://github.com/devacame/personal-blog)
