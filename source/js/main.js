window.onload = function () {
	wrapImageWithLightBox();

	treeNodeDirClickEvent();
	switchTreeOrIndex();
	toggleTreeNodes();

	pureFetchLoading();
	setupNavigation();

	activeArticleToc();

	searchTreeNode();
};

/**
 * Wrap images with light box support.
 */
function wrapImageWithLightBox() {
	const imageList = document.querySelectorAll("#article-content img:not(#header img)");
	const imageLinks = Array.from(imageList).map((image) => image.getAttribute("src"));
	let currentIndex = 0;

	const lightbox = document.createElement("div");
	lightbox.id = "lightbox";
	Object.assign(lightbox.style, {
		display: "none",
		position: "fixed",
		top: "0",
		left: "0",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		zIndex: "1000",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		overflow: "hidden",
	});

	const img = document.createElement("img");
	Object.assign(img.style, {
		maxWidth: "80%",
		maxHeight: "80%",
	});
	lightbox.appendChild(img);

	const createButton = (iconClass, position) => {
		const button = document.createElement("a");
		button.innerHTML = `<i class="${iconClass}"></i>`;
		Object.assign(button.style, {
			position: "absolute",
			[position]: "10px",
			top: "50%",
			transform: "translateY(-50%)",
			color: "white",
			fontSize: "2em",
			cursor: "pointer",
		});
		return button;
	};

	const prevButton = createButton("fa fa-chevron-left", "left");
	const nextButton = createButton("fa fa-chevron-right", "right");

	lightbox.appendChild(prevButton);
	lightbox.appendChild(nextButton);
	document.body.appendChild(lightbox);

	const showImage = (index) => {
		img.src = imageLinks[index];
		lightbox.style.display = "flex";
		document.body.style.overflow = "hidden";
	};

	prevButton.addEventListener("click", () => {
		currentIndex = (currentIndex - 1 + imageLinks.length) % imageLinks.length;
		showImage(currentIndex);
	});

	nextButton.addEventListener("click", () => {
		currentIndex = (currentIndex + 1) % imageLinks.length;
		showImage(currentIndex);
	});

	lightbox.addEventListener("click", (e) => {
		const excludeTarget = [
			img,
			prevButton,
			nextButton,
			prevButton.querySelector("i"),
			nextButton.querySelector("i"),
		];
		if (!excludeTarget.includes(e.target)) {
			lightbox.style.display = "none";
			document.body.style.overflow = "auto";
		}
	});

	let lastScrollTime = 0;
	const scrollThreshold = 200;

	lightbox.addEventListener("wheel", (e) => {
		const currentTime = new Date().getTime();
		if (currentTime - lastScrollTime < scrollThreshold) {
			return;
		}
		lastScrollTime = currentTime;

		e.preventDefault();
		if (e.deltaY < 0) {
			prevButton.click();
			return;
		}
		nextButton.click();
	});

	imageList.forEach((image, index) => {
		const imageParent = image.parentElement;
		const imageUrl = image.getAttribute("src");
		const imageWrapLink = document.createElement("a");
		imageWrapLink.className = "gallery";
		imageWrapLink.setAttribute("href", imageUrl);
		imageWrapLink.appendChild(image);
		imageParent.appendChild(imageWrapLink);

		imageWrapLink.addEventListener("click", (e) => {
			e.preventDefault();
			currentIndex = index;
			showImage(currentIndex);
		});
	});
}

/**
 * Toggle sidebar to expend
 * @param {*} state Toggle status of sidebar
 */
function toggleSidebar(state) {
	const sidebar = document.querySelector("#sidebar");
	const content = document.querySelector("#content");
	const header = document.querySelector("#header");
	const footer = document.querySelector("#footer");
	const toggleIcon = document.querySelector("#sidebar-toggle i");

	const classNames = {
		on: {
			toggleIcon: ["fa-arrow-right", "fa-close"],
			sidebar: "on",
			content: "content-on",
			header: "header-on",
			footer: "header-on",
		},
		off: {
			toggleIcon: ["fa-close", "fa-arrow-right"],
			sidebar: "off",
			content: "content-on",
			header: "off",
			footer: "off",
		},
	};

	const {
		toggleIcon: iconClasses,
		sidebar: sidebarClass,
		content: contentClass,
		header: headerClass,
		footer: footerClass,
	} = classNames[state];

	toggleIcon.classList.replace(...iconClasses);
	sidebar.className = sidebarClass;

	if (state === "on" && window.matchMedia("(min-width: 1100px)").matches) {
		content.classList.toggle(contentClass);
		header.className = headerClass;
		footer.className = footerClass;
	}
	if (state === "off") {
		content.classList.toggle(contentClass);
		content.classList.add("off");
		header.className = headerClass;
		footer.className = footerClass;
	}
}

/**
 * The click event related to the tree node,
 * which controls the display and hiding of parent and child nodes.
 */
function treeNodeDirClickEvent() {
	const clickActiveNode = document.querySelector("#tree .active");
	if (clickActiveNode) {
		showActiveNodeChildren(clickActiveNode, true);
	}

	document.addEventListener("click", function (e) {
		if (e.target.matches("#tree li.file > a, #tree li.directory > a")) {
			e.preventDefault();
			toggleActiveNodeTree(e.target);
			const toggleAllNodeBtns = document.querySelectorAll("#tree .fa-caret-up");
			toggleAllNodeBtns.forEach((btn) => btn.classList.replace("fa-caret-up", "fa-caret-down"));
		}
	});
}

/**
 * sidebar icon toggle event.
 */
function switchTreeOrIndex() {
	const sidebarToggle = document.querySelector("#sidebar-toggle");
	const sidebarEl = document.querySelector("#sidebar");

	sidebarToggle.addEventListener("click", () => {
		sidebarEl.classList.contains("on") ? toggleSidebar("off") : toggleSidebar("on");
	});

	document.body.addEventListener("click", (e) => {
		if (window.matchMedia("(max-width: 1100px)").matches) {
			const sidebarEl = document.querySelector("#sidebar");
			if (!e.target.closest("#sidebar") && sidebarEl.classList.contains("on")) {
				toggleSidebar("off");
			}
		}
	});

	if (window.matchMedia("(min-width: 1100px)").matches) {
		return toggleSidebar("on");
	}
	toggleSidebar("off");
}

/**
 * Generate articles catalog and active the current toc by scroll
 */
function activeArticleToc() {
	const articleTocList = document.querySelectorAll(".article-toc");
	articleTocList.forEach((tocNode) => {
		tocNode.innerHTML = "";
		tocNode.style.display = "none";
		tocNode.classList.remove("active-toc");
	});

	const activeLi = document.querySelector(
		"#tree li.file.active, #tree li.directory .directory.active"
	);

	if (!activeLi) {
		return;
	}

	const activeTocNode = activeLi.parentElement.querySelector(".article-toc");
	activeTocNode.classList.add("active-toc");
	activeTocNode.style.display = "block";

	const articleContent = document.querySelector("#article-content");
	const labelNodeList = articleContent.querySelectorAll("h1, h2, h3, h4, h5, h6") || [];

	const tocJson = [];
	const stack = [];
	labelNodeList.forEach((label) => {
		const level = parseInt(label.tagName.slice(1), 10);
		const id = label.id;
		const title = label.querySelector("a").getAttribute("title");

		const tocItem = {
			level,
			id,
			title,
			children: [],
		};

		while (stack.length > 0 && stack[stack.length - 1].level >= level) {
			stack.pop();
		}

		if (stack.length > 0) {
			stack[stack.length - 1].children.push(tocItem);
		} else {
			tocJson.push(tocItem);
		}
		stack.push(tocItem);
	});

	const generateToc = (tocJson, parentElement) => {
		tocJson.forEach((item) => {
			const li = document.createElement("li");
			const a = document.createElement("a");
			a.href = `#${item.id}`;
			a.textContent = item.title;
			li.appendChild(a);

			if (item.children.length > 0) {
				const ul = document.createElement("ul");
				li.appendChild(ul);
				generateToc(item.children, ul);
			}

			parentElement.appendChild(li);
		});
	};

	const ul = document.createElement("ul");
	activeTocNode.appendChild(ul);
	generateToc(tocJson, ul);

	const tocLinks = document.querySelectorAll(".article-toc a") || [];
	tocLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			const decodedHash = decodeURIComponent(link.getAttribute("href"));
			const target = document.querySelector(decodedHash);
			window.scrollTo({
				top: target.offsetTop,
				behavior: "smooth",
			});

			setTimeout(() => (location.hash = decodedHash), 500);
		});
	});

	const anchorList = document.querySelectorAll(".headerlink");

	window.addEventListener("scroll", function () {
		const articleContent = document.querySelector("#article-content");
		const isBottom = window.scrollY + window.innerHeight - 300 >= articleContent.scrollHeight;
		if (isBottom) {
			const tocLinkList = document.querySelectorAll(".article-toc a");
			tocLinkList.forEach((tocLink) => tocLink.classList.add("read"));
			return;
		}

		anchorList.forEach((anchor) => {
			const tocLinkList = document.querySelectorAll(
				`.article-toc a[href="${anchor.getAttribute("href")}"]`
			);
			const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
			const windowTop = window.scrollY;
			if (anchorTop <= windowTop + 100) {
				tocLinkList.forEach((tocLink) => {
					tocLink.classList.add("read");
					tocLink.parentNode.style.color = "#c7bb9c";
				});
				return;
			}

			tocLinkList.forEach((tocLink) => {
				tocLink.classList.remove("read");
				tocLink.parentNode.style.color = "#000000";
			});
		});
	});

	const tocUlList = activeTocNode.querySelectorAll("ul");
	tocUlList.forEach((ul) => {
		ul.style.display = "block";
	});

	anchorList.forEach((anchor) => {
		const tocLinkList = document.querySelectorAll(
			`.article-toc a[href="${anchor.getAttribute("href")}"]`
		);
		const anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
		const windowTop = window.scrollY;
		if (anchorTop <= windowTop + 100) {
			tocLinkList.forEach((tocLink) => {
				tocLink.classList.add("read");
				tocLink.parentNode.style.color = "#c7bb9c";
			});
			return;
		}

		tocLinkList.forEach((tocLink) => {
			tocLink.classList.remove("read");
			tocLink.parentNode.style.color = "#000000";
		});
	});
}

/**
 * Toggle all tree nodes.
 */
function toggleTreeNodes() {
	const treeUls = document.querySelectorAll("#tree > ul");
	treeUls.forEach((treeUl) => {
		const beforeEl = document.createElement("i");
		beforeEl.className = "fa fa-caret-down";
		beforeEl.setAttribute("aria-hidden", "true");
		Object.assign(beforeEl.style, {
			position: "absolute",
			right: "20px",
			cursor: "pointer",
			color: "#454545",
		});

		beforeEl.addEventListener("mouseover", () => {
			beforeEl.style.color = "rgb(122, 122, 122)";
		});

		beforeEl.addEventListener("mouseout", () => {
			beforeEl.style.color = "#454545";
		});

		treeUl.prepend(beforeEl);

		beforeEl.addEventListener("click", () => {
			const branches = treeUl.querySelectorAll("li.directory .fa");
			if (beforeEl.classList.contains("fa-caret-down")) {
				beforeEl.classList.replace("fa-caret-down", "fa-caret-up");

				Array.from(branches).forEach((branch) => {
					if (!branch.classList.contains("fa-minus-square-o")) {
						const targetNode = branch.closest("li.directory");
						toggleActiveNodeTree(targetNode);
					}
				});
				return;
			}

			beforeEl.classList.remove("fa-caret-up");
			beforeEl.classList.add("fa-caret-down");

			branches.forEach((branch) => {
				if (!branch.classList.contains("fa-plus-square-o")) {
					const targetNode = branch.closest("li.directory");
					toggleActiveNodeTree(targetNode);
				}
			});
		});
	});
}

/**
 * Toggle the current active node
 * @param { Node } node active sidebar link node
 */
function toggleActiveNodeTree(node) {
	const nodeUl = node.closest("ul");
	const dirIcon = node.querySelector(".fa");
	const subTree = nodeUl.querySelector("li");

	if (dirIcon) {
		const iconIsOpen = dirIcon.classList.contains("fa-minus-square-o");
		if (iconIsOpen) {
			if (subTree) {
				Array.from(subTree.children).forEach((child) => {
					const tagName = child.tagName.toLowerCase();
					if (tagName === "ul") {
						child.style.display = "";
					}
				});
			}
			dirIcon.classList.replace("fa-minus-square-o", "fa-plus-square-o");
			return;
		}
	}

	if (subTree) {
		Array.from(subTree.children).forEach((child) => {
			const tagName = child.tagName.toLowerCase();
			if (tagName === "ul") {
				child.style.display = "block";
			}
		});
	}

	if (dirIcon) {
		dirIcon.classList.replace("fa-plus-square-o", "fa-minus-square-o");
	}
}

/**
 * Show the sibling or child nodes of the currently active node.
 * @param {*} activeNode current active node
 * @param {*} isSiblings directory mark
 * @returns
 */
function showActiveNodeChildren(activeNode, isSiblings) {
	const treeNode = activeNode?.getAttribute("id") || "";
	if (treeNode === "tree") {
		return;
	}

	const nodeUl = activeNode?.tagName.toLowerCase() || "";

	if (nodeUl === "ul") {
		activeNode.style.display = "block";

		if (isSiblings) {
			const nodeChildNodes = activeNode.parentNode.children;
			Array.from(nodeChildNodes).forEach((node) => {
				node.style.display = "block";

				const tagName = node.tagName.toLowerCase();
				if (tagName === "a") {
					node.style.display = "inline";

					const iconEl = node.querySelector(".fa-plus-square-o");
					iconEl?.classList.replace("fa-plus-square-o", "fa-minus-square-o");
				}
			});
		}
	}

	showActiveNodeChildren(activeNode.parentElement, isSiblings);

	const tagName = activeNode.tagName.toLowerCase();

	if (tagName === "a") {
		toggleActiveNodeTree(activeNode);
	}
}

/**
 * Page loading by fetch
 * @param { String } url loading page url
 */
function pureFetchLoading(url) {
	url = url || location.href;
	fetch(url)
		.then((response) => response.text())
		.then((html) => {
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");

			const keywords = doc.querySelector("meta[name='keywords']")?.getAttribute("content");
			const description = doc.querySelector("meta[name='description']")?.getAttribute("content");

			document.title = doc.title;
			document.querySelector("meta[name='keywords']").setAttribute("content", keywords);
			document.querySelector("meta[name='description']").setAttribute("content", description);

			const newContent = doc.querySelector("#content");

			if (!newContent) {
				return (location.href = "/404");
			}

			const pageContent = document.querySelector("#content");
			pageContent.innerHTML = newContent.innerHTML;
			document.querySelector("#tree .active")?.classList.remove("active");

			const title = decodeURI(window.location.pathname).slice(0, -1);
			if (title.length) {
				let treeNodes = document.querySelectorAll(`#tree li.file a[title='${title}']`);
				if (treeNodes.length) {
					document.querySelectorAll(".fa-minus-square-o").forEach((icon) => {
						icon.classList.replace("fa-minus-square-o", "fa-plus-square-o");
					});
					document.querySelectorAll("#tree ul").forEach((ul) => {
						ul.style.display = "none";
					});
					if (treeNodes.length > 1) {
						const categories = document
							.querySelector("#article-categories span:last-child a")
							?.innerHTML.trim();
						if (categories) {
							const directoryList = document.querySelectorAll(
								"#tree li.directory a:contains('" + categories + "')"
							);
							treeNodes = Array.from(directoryList)
								.map((el) => el.nextElementSibling.querySelector(`a[title='${title}']`))
								.filter((el) => el);
						}
					}
					treeNodes[0].parentNode.classList.add("active");

					const activeNode = document.querySelector("#tree .active");
					showActiveNodeChildren(activeNode, true);
				}

				if (!treeNodes.length) {
					const treeNode = document.querySelector(`#tree li.directory a[title='${title}']`);
					treeNode?.classList.add("active");
				}
				activeArticleToc();
			}
			wrapImageWithLightBox();
			reloadMarkScript();
		})
		.catch((error) => console.error("Error loading content:", error));
}

/**
 * Reload web analysis when page pure loading
 */
function reloadMarkScript() {
	const scripts = document.querySelectorAll("script[reload]");
	scripts.forEach((script) => {
		const parentElement = script.parentElement;
		if (parentElement) {
			const newScript = document.createElement("script");
			newScript.innerHTML = script.innerHTML;
			for (const { name, value } of script.attributes) {
				newScript.setAttribute(name, value);
			}
			parentElement.removeChild(script);
			parentElement.appendChild(newScript);
		}
	});
}

/**
 * When the page is first loaded, the page loading is performed.
 */
function setupNavigation() {
	document.addEventListener("click", function (e) {
		const target = e.target.closest("a");
		if (
			target &&
			target.matches(
				"#menu a:not(.item-icon), #index a, #tree li.file > a[href], #tree li.directory > a[href], .post-guide a"
			)
		) {
			e.preventDefault();
			const url = target.href;
			history.pushState(null, "", url);
			pureFetchLoading(url);
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	});

	window.addEventListener("popstate", function (event) {
		if (event.state === null) {
			return;
		}
		pureFetchLoading();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
}

/**
 * search tree node by keyword
 */
function searchTreeNode() {
	const searchInput = document.getElementById("search-input");

	searchInput.addEventListener("input", function (e) {
		e.preventDefault();

		const inputContent = e.currentTarget.value;
		const faMinusIcons = document.querySelectorAll(".fa-minus-square-o");
		const treeUls = document.querySelectorAll("#tree ul");

		if (!inputContent) {
			const activeNode = document.querySelector("#tree .active");

			faMinusIcons.forEach((icon) => {
				icon.classList.replace("fa-minus-square-o", "fa-plus-square-o");
			});
			treeUls.forEach((ul) => (ul.style.display = "none"));

			if (activeNode) {
				return showActiveNodeChildren(activeNode, true);
			}

			const treeEl = document.querySelector("#tree");
			Array.from(treeEl.children).forEach((child) => {
				child.style.display = "block";
			});
			return;
		}

		treeUls.forEach((ul) => {
			ul.style.display = "none";
		});

		const treeNodeLinks = document.querySelectorAll("#tree li a");
		const searchResultNodes = Array.from(treeNodeLinks).filter((node) => {
			return node.textContent.includes(inputContent);
		});

		if (searchResultNodes.length) {
			searchResultNodes.forEach((result) => {
				toggleActiveNodeTree(result);
				showActiveNodeChildren(result.parentElement, false);

				const linkTitle = result.title;
				const liNodeList = document.querySelectorAll(
					`#tree li.directory:has(a[title="${linkTitle}"])`
				);
				liNodeList.forEach((li) => {
					const iconEl = li.querySelector(".fa");
					iconEl.classList.replace("fa-plus-square-o", "fa-minus-square-o");
				});
			});
		}
	});

	searchInput.addEventListener("keyup", (e) => {
		e.preventDefault();
		if (e.code === "Enter") {
			const inputContent = e.currentTarget.value;
			if (inputContent) {
				window.open(window.searchEngine + inputContent + "%20site:" + window.homeHost, "_blank");
			}
		}
	});
}
