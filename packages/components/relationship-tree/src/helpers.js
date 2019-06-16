/**
 * isPrimary: determines whether the rank can be visible by default when expanding the full tree. Things like subs &
 * supers may only be defined for some data. They WILL appear if they're defined, but not otherwise.
 */
export const ranks = [ // 'High'?
	{ rank: 'kingdom', isPrimary: true },
	{ rank: 'phylum', isPrimary: true },
	{ rank: 'subphylum', isPrimary: false },
	{ rank: 'superclass', isPrimary: false },
	{ rank: 'class', isPrimary: true },
	{ rank: 'subclass', isPrimary: false },
	{ rank: 'infraclass', isPrimary: false },
	{ rank: 'subterclass', isPrimary: false },
	{ rank: 'superorder', isPrimary: false },
	{ rank: 'order', isPrimary: true },
	{ rank: 'suborder', isPrimary: false },
	{ rank: 'infraorder', isPrimary: false },
	{ rank: 'parvorder', isPrimary: false },
	{ rank: 'zoosection', isPrimary: false },
	{ rank: 'zoosubsection', isPrimary: false },
	{ rank: 'superfamily', isPrimary: false },
	{ rank: 'epifamily', isPrimary: false },
	{ rank: 'family', isPrimary: false },
	{ rank: 'subfamily', isPrimary: false },
	{ rank: 'supertribe', isPrimary: false },
	{ rank: 'tribe', isPrimary: false },
	{ rank: 'subtribe', isPrimary: false },
	{ rank: 'genus', isPrimary: false },
	{ rank: 'genushybrid', isPrimary: false },
	{ rank: 'subgenus', isPrimary: false },
	{ rank: 'section', isPrimary: false },
	{ rank: 'subsection', isPrimary: false },
	{ rank: 'complex', isPrimary: false },
	{ rank: 'species', isPrimary: true },
	{ rank: 'hybrid', isPrimary: true },
	{ rank: 'subspecies', isPrimary: false },
	{ rank: 'variety', isPrimary: false },
	{ rank: 'form', isPrimary: false },
	{ rank: 'infrahybrid', isPrimary: false },
]


// recurse through the destination tree and append the new taxonomy info. As soon as the tree starts to deviate
// from an original path, add a new entry
export const recurseAppend = (sourceArray, dest, parent = "null") => {
	if (!sourceArray.length) {
		return;
	}
	const currItem = sourceArray.shift();
	let added = false;
	dest.forEach((row, index) => {
		if (row.id === currItem.id) {
			if (sourceArray.length) {
				recurseAppend(sourceArray, dest[index].children, currItem.name);
				added = true;
			}
		}
	});

	if (!added) {
		dest.push({
			name: currItem.preferred_common_name ? currItem.preferred_common_name : currItem.name,
			id: currItem.id,
			parent,
			children: []
		});
		appendBranch(sourceArray, dest[dest.length-1].children, currItem.name);
	}
};

// Converts a flat array into a nested object
export const appendBranch = (sourceArray, dest) => {
	if (!sourceArray.length) {
		return;
	}

	const currItem = sourceArray.shift();
	dest.push({
		rank: currItem.rank,
		defined: true,
		name: currItem.name,
		preferred_common_name: currItem.preferred_common_name,
		id: currItem.id,
		photo: currItem.default_photo,
		wikipedia_summary: currItem.wikipedia_summary,
		wikipedia_url: currItem.wikipedia_url,
		children: []
	});
	appendBranch(sourceArray, dest[0].children, currItem.name);
};


/**
 * Examines a flat array of the taxonomy returned from iNaturalist and pads it out to include all ranks. This method
 * assumes the
 * @param sourceArray
 * @param remainingRanks
 * @param dest
 */
export const fillBranch = (sourceArray, remainingRanks, dest) => {
	if (!sourceArray.length) {
		return;
	}
	const currRank = remainingRanks.shift();

	// if the source data doesn't contain the current rank, u
	if (sourceArray[0].rank !== currRank.rank) {
		dest.push({ rank: currRank.rank, defined: false });
		return fillBranch(sourceArray, remainingRanks, dest);
	}

	const currItem = sourceArray.shift();
	dest.push({
		rank: currRank.rank,
		defined: true,
		name: currItem.name
	});
	fillBranch(sourceArray, remainingRanks, dest);
};