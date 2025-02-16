window.onload = function () {
	hljs.initHighlightingOnLoad();
	switchDarkMode();

	wrapImageWithLightBox();
	scrollToTop();
	pageScroll();

	treeNodeDirClickEvent();
	switchTreeOrIndex();
	activeArticleToc();
	toggleTreeNodes();

	pureFetchLoading();
	setupNavigation();

	searchTreeNode();
};

/**
 * Switch dark mode.
 */
function switchDarkMode() {
	const localModel = localStorage.getItem("darkModel");
	const darkModel = !localModel ? 0 : localModel;

	const darkModeIcon = document.querySelector("#menu .dark-mode i");

	if (darkModel == 1) {
		darkModeIcon.classList.replace("fa-moon-o", "fa-sun-o");
		DarkReader.enable({
			brightness: 100,
			contrast: 90,
			sepia: 10,
		});
	}

	darkModeIcon.addEventListener("click", () => {
		const isMoon = darkModeIcon.classList.contains("fa-moon-o");
		darkModeIcon.classList.toggle("fa-moon-o", !isMoon);
		darkModeIcon.classList.toggle("fa-sun-o", isMoon);
		localStorage.setItem("darkModel", isMoon ? 1 : 0);
		isMoon ? DarkReader.enable({ brightness: 100, contrast: 90, sepia: 10 }) : DarkReader.disable();
	});
}

/**
 * Wrap images with light box support.
 */
function wrapImageWithLightBox() {
	const imageList = document.querySelectorAll("img:not(#header img)");
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
 * Scroll to top.
 */
function scrollToTop() {
	const topTopBtn = document.querySelector("#totop-toggle");
	topTopBtn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
}

/**
 * Header scroll event.
 */
function pageScroll() {
	let startHeight = 0;
	window.addEventListener("scroll", () => {
		const { scrollY: endHeight } = window;
		const distance = endHeight - startHeight;
		startHeight = endHeight;
		document.querySelector("#header").style.display = distance > 0 && endHeight > 50 ? "none" : "";
	});
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
		if (e.target.matches("#tree a")) {
			toggleActiveNodeTree(e.target);
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
	let activeTocList = document.querySelectorAll(".article-toc.active-toc");

	articleTocList.forEach((toc) => {
		toc.innerHTML = "";
		toc.style.display = "none";
	});
	activeTocList.forEach((activeToc) => {
		activeToc.classList.remove("active-toc");
	});

	const activeNode = document.querySelector("#tree .active");
	activeNode?.nextElementSibling.classList.add("active-toc");

	const articleContent = document.querySelector("#article-content");
	const labelList = articleContent?.children || [];

	let content = "<ul>";

	let max_level = 4;
	let labelLevel = {
		h1: 1,
		h2: 2,
		h3: 3,
		h4: 4,
	};
	let labelMaxLevel = {
		h1: 1 - max_level + 1,
		h2: 2 - max_level + 1,
		h3: 3 - max_level + 1,
		h4: 4 - max_level + 1,
	};

	for (const label of labelList) {
		let level = labelLevel[label.tagName.toLowerCase()] || 5;
		if (level < max_level) {
			max_level = level;
		}
	}

	Array.from(labelList).forEach((label, i) => {
		let level = labelMaxLevel[label.tagName.toLowerCase()] || 0;
		if (level != 0) {
			let anchor = document.createElement("span");
			anchor.className = "anchor";
			anchor.id = "_label" + i;
			label.parentNode.insertBefore(anchor, label);
			content +=
				'<li class="level_' +
				level +
				'"><a href="#_label' +
				i +
				'"> ' +
				label.textContent +
				"</a></li>";
		}
	});

	content += "</ul>";

	articleTocList.forEach((activeToc) => {
		activeToc.innerHTML += content;
	});

	let tocLinks = document.querySelectorAll(".article-toc a");
	if (tocLinks.length > 0) {
		tocLinks.forEach((link) => {
			link.addEventListener("click", function (e) {
				e.preventDefault();
				let target = document.querySelector(this.hash);
				window.scrollTo({
					top: target.offsetTop,
					behavior: "smooth",
				});
			});
		});

		window.addEventListener("scroll", function () {
			let anchorList = document.querySelectorAll(".anchor");

			anchorList.forEach((anchor) => {
				let tocLinkList = document.querySelectorAll(
					'.article-toc a[href="#' + anchor.getAttribute("id") + '"]'
				);

				let anchorTop = anchor.getBoundingClientRect().top + window.scrollY;
				let windowTop = window.scrollY;
				if (anchorTop <= windowTop + 100) {
					tocLinkList.forEach((tocLink) => tocLink.classList.add("read"));
					return;
				}
				tocLinkList.forEach((tocLink) => tocLink.classList.remove("read"));
			});
		});
	}

	activeTocList = document.querySelectorAll(".article-toc.active-toc");
	activeTocList.forEach((activeToc) => {
		activeToc.style.display = "block";

		activeToc.childNodes.forEach((child) => {
			child.style.display = "block";
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
			const branches = treeUl.querySelectorAll("a.directory i");

			if (this.classList.contains("fa-caret-down")) {
				this.classList.replace("fa-caret-down", "fa-caret-up");

				Array.from(branches).forEach((branch) => {
					if (!branch.classList.contains("fa-minus-square-o")) {
						branch.click();
					}
				});
				return;
			}

			this.classList.remove("fa-caret-up");
			this.classList.add("fa-caret-down");

			branches.forEach((branch) => {
				if (!branch.classList.contains("fa-plus-square-o")) {
					branch.click();
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
	const dirIcon = node.parentNode.querySelector(".fa");
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
			const newContent = doc.querySelector("#content").innerHTML;
			document.querySelector("#content").innerHTML = newContent;
			document.title = doc.title;

			document.querySelectorAll("pre code").forEach((block) => {
				hljs.highlightBlock(block);
			});
			document.querySelector("#tree .active")?.classList.remove("active");

			const fullTitle = decodeURI(window.location.pathname).slice(1, -1).split("/");
			fullTitle.splice(0, 3);
			const title = fullTitle.join("/");

			if (title.length) {
				let searchResult = document.querySelectorAll("#tree li.file a[title='" + title + "']");
				if (searchResult.length) {
					document.querySelectorAll(".fa-minus-square-o").forEach((icon) => {
						icon.classList.replace("fa-minus-square-o", "fa-plus-square-o");
					});
					document.querySelectorAll("#tree ul").forEach((ul) => {
						ul.style.display = "none";
					});
					if (searchResult.length > 1) {
						const categories = document
							.querySelector("#article-categories span:last-child a")
							?.innerHTML.trim();
						if (categories) {
							const directoryList = document.querySelectorAll(
								"#tree li.directory a:contains('" + categories + "')"
							);
							searchResult = Array.from(directoryList)
								.map((el) => el.nextElementSibling.querySelector("a[title='" + title + "']"))
								.filter((el) => el);
						}
					}
					searchResult[0].parentNode.classList.add("active");

					const activeNode = document.querySelector("#tree .active");
					showActiveNodeChildren(activeNode, true);
				}

				if (!searchResult.length) {
					searchResult = document.querySelectorAll("#tree li.directory a[title='" + title + "']");
					searchResult[0].classList.add("active");
				}
				activeArticleToc();
			}
			wrapImageWithLightBox();
		})
		.catch((error) => console.error("Error loading content:", error));
}

/**
 * When the page is first loaded, the page loading is performed.
 */
function setupNavigation() {
	document.addEventListener("click", function (e) {
		const target = e.target.closest("a");
		if (target && target.matches("#menu a, #tree a, #index a")) {
			e.preventDefault();
			const url = target.href;
			history.pushState(null, "", url);
			pureFetchLoading(url);
		}
	});

	window.addEventListener("popstate", function () {
		pureFetchLoading();
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

		const searchResultNode = document.querySelectorAll("#tree li a");
		const searchResult = Array.from(searchResultNode).filter((node) => {
			return node.textContent.includes(inputContent);
		});

		if (searchResult.length) {
			searchResult.forEach((result) => {
				toggleActiveNodeTree(result);
				showActiveNodeChildren(result.parentElement, false);

				const linkTitle = result.title;
				const liNodeList = document.querySelectorAll(
					`#tree li.directory:has(a[title="${linkTitle}"])`
				);
				liNodeList.forEach((li) => {
					console.log(li);
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
				window.open(searchEngine + inputContent + "%20site:" + homeHost, "_blank");
			}
		}
	});
}
