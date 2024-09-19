import React, {useState} from 'react'
import {
	ChevronLeft,
	ChevronDown,
	Play,
	Heart,
	ShoppingCart,
	Bell,
	Star,
	Share2,
	MoreHorizontal,
	Menu,
	Share,
	X,
} from 'lucide-react'

interface Lesson {
	id: number
	title: string
	duration: string
	isPreview?: boolean
}

interface Section {
	title: string
	lessons: Lesson[]
}

interface SuggestedCourse {
	title: string
	author: string
	rating: number
	image: string
}

interface CourseData {
	title: string
	description: string
	fullPrice: number
	discountedPrice: number
	discount: number
	publisher: {
		name: string
		role: string
		image: string
		rating: number
		reviews: number
		students: number
		courses: number
	}
	rating: number
	students: number
	lessons: number
	duration: string
	level: string
	sections: Section[]
	suggestedCourses: SuggestedCourse[]
}

// Static course data
const courseData: CourseData = {
	title: 'Blender 3D Fundamentals',
	description:
		'Learn The Basics of 3D in Blender with a Project Based Approach',
	fullPrice: 39.99,
	discountedPrice: 15.99,
	discount: 60,
	publisher: {
		name: 'Ryan Curtis',
		role: '3D Artist',
		image: '/placeholder.svg',
		rating: 4.8,
		reviews: 889,
		students: 4887,
		courses: 6,
	},
	rating: 4.8,
	students: 2492,
	lessons: 128,
	duration: '56h 28m',
	level: 'Beginner',
	sections: [
		{
			title: 'Course Introduction',
			lessons: [
				{
					id: 1,
					title: 'Introduction',
					duration: '5:30',
					isPreview: true,
				},
				{id: 2, title: 'Downloading Blender', duration: '10:15'},
				{id: 3, title: 'Settings and Preferences', duration: '15:45'},
				{id: 4, title: 'Blender Interface', duration: '20:00'},
			],
		},
		{
			title: 'Basics of Blender 3D',
			lessons: [
				{id: 5, title: '3D Viewport Navigation', duration: '12:30'},
				{id: 6, title: 'Object Mode vs Edit Mode', duration: '18:00'},
			],
		},
		{
			title: 'Mesh Modeling',
			lessons: [
				{id: 7, title: 'Creating Basic Shapes', duration: '22:15'},
				{id: 8, title: 'Extrude, Inset, and Bevel', duration: '25:00'},
			],
		},
	],
	suggestedCourses: [
		{
			title: 'Stylize 3D Characters',
			author: 'Julian',
			rating: 4.8,
			image: '/placeholder.svg',
		},
		{
			title: 'Geometry Nodes: Procedural Modeling',
			author: 'Polygon Runway',
			rating: 4.9,
			image: '/placeholder.svg',
		},
	],
}

const Component: React.FC = () => {
	const [expandedSections, setExpandedSections] = useState<number[]>([0])
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const toggleSection = (index: number) => {
		setExpandedSections(prev =>
			prev.includes(index)
				? prev.filter(i => i !== index)
				: [...prev, index],
		)
	}

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	return (
		<div className='flex flex-col h-screen bg-black'>
			{/* Header */}
			<header className='bg-black text-white p-4 flex justify-between items-center'>
				<div className='text-xl md:text-2xl font-bold flex items-center gap-2'>
					<button onClick={toggleSidebar} className=''>
						<Menu />
					</button>
					Quantum
				</div>
				<div className='flex items-center space-x-4'>
					<button className='hover:text-gray-300 hidden sm:block'>
						<Heart className='w-5 h-5 md:w-6 md:h-6' />
					</button>
					<button className='hover:text-gray-300'>
						<ShoppingCart className='w-5 h-5 md:w-6 md:h-6' />
					</button>
					<button className='hover:text-gray-300 hidden sm:block'>
						<Bell className='w-5 h-5 md:w-6 md:h-6' />
					</button>
				</div>
			</header>

			<div className='flex flex-1 overflow-hidden'>
				{/* Sidebar */}
				<aside
					className={`w-64 bg-black text-white overflow-y-auto fixed inset-y-0 left-0 z-20 transform ${
						isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
					} lg:relative lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
					<div className='p-4'>
						<div className='flex justify-between items-center mb-6 lg:hidden'>
							<button
								className='text-gray-400 hover:text-white'
								onClick={toggleSidebar}>
								<X className='w-6 h-6' />
							</button>
						</div>
						<button className='flex items-center text-gray-400 hover:text-white mb-6'>
							<ChevronLeft className='w-5 h-5 mr-2' />
							Back to courses
						</button>
						<h2 className='text-xl font-bold mb-2'>Course</h2>
						<h3 className='text-lg font-semibold mb-4'>
							{courseData.title}
						</h3>

						{courseData.sections.map((section, index) => (
							<div key={index} className='mb-4'>
								<button
									className='flex items-center justify-between w-full text-left font-medium hover:text-gray-300'
									onClick={() => toggleSection(index)}>
									{section.title}
									<ChevronDown
										className={`w-5 h-5 transform transition-transform ${
											expandedSections.includes(index)
												? 'rotate-180'
												: ''
										}`}
									/>
								</button>
								{expandedSections.includes(index) && (
									<ul className='mt-2 space-y-2'>
										{section.lessons.map(lesson => (
											<li
												key={lesson.id}
												className='flex items-center text-sm'>
												{lesson.isPreview ? (
													<Play className='w-4 h-4 mr-2 text-purple-400' />
												) : (
													<div className='w-4 h-4 rounded-full border border-gray-600 mr-2 flex items-center justify-center'>
														<span className='text-xs'>
															{lesson.id}
														</span>
													</div>
												)}
												<span className='flex-grow'>
													{lesson.title}
												</span>
												<span className='text-gray-400 text-xs'>
													{lesson.duration}
												</span>
												{lesson.isPreview && (
													<span className='ml-2 px-1 py-0.5 bg-gray-700 text-gray-300 text-xs rounded'>
														Preview
													</span>
												)}
											</li>
										))}
									</ul>
								)}
							</div>
						))}
					</div>
				</aside>

				{/* Main content area */}
				<main className='flex-1 overflow-y-auto bg-white rounded-2xl '>
					<div className='max-w-7xl mx-auto p-4 sm:p-6 md:p-8'>
						<div className='flex  justify-between rounded-2xl overflow-hidden mb-8 gap-2'>
							<div className='w-full rounded-lg '>
								<div className='relative h-48 sm:h-64 md:h-80 bg-purple-500'>
									<img
										src='/placeholder.svg'
										alt='Blender 3D Fundamentals'
										className='w-full h-full object-cover'
									/>
									<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
										<button className='bg-white bg-opacity-30 rounded-full p-2 sm:p-4'>
											<Play className='w-8 h-8 sm:w-12 sm:h-12 text-white' />
										</button>
									</div>
								</div>
								<div className='p-4 sm:p-6 text-white bg-purple-500 rounded-b-2xl'>
									<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2'>
										{courseData.title.toUpperCase()}
									</h1>
									<p className='text-base sm:text-lg md:text-xl'>
										{courseData.description}
									</p>
								</div>
								<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0'>
									<div className='bg-white flex justify-between w-full px-7'>
										<div className='flex items-center space-x-4 '>
											<img
												src={courseData.publisher.image}
												alt={courseData.publisher.name}
												width={48}
												height={48}
												className='rounded-full'
											/>
											<div>
												<h3 className='font-bold'>
													{courseData.publisher.name}
												</h3>
												<p className='text-sm text-gray-600'>
													{courseData.publisher.role}
												</p>
											</div>
										</div>
										<div className='flex items-center space-x-4'>
											<span className='flex items-center'>
												<Heart className='w-5 h-5 text-gray-400 mr-1' />{' '}
												982
											</span>
											<div className='flex items-center gap-1'>
												<Share className='w-5 h-5 text-gray-400' />
												Share
											</div>
											<MoreHorizontal className='w-5 h-5 text-gray-400' />
										</div>
									</div>
								</div>
							</div>
							<div className='bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-8 w-[20rem] '>
								<div className='flex justify-between items-center mb-4'>
									<span className='text-sm text-gray-600'>
										Full course
									</span>
									<span className='bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm'>
										{courseData.discount}% OFF
									</span>
								</div>
								<div className='flex items-baseline mb-4'>
									<span className='text-3xl font-bold'>
										${courseData.discountedPrice}
									</span>
									<span className='text-gray-500 line-through ml-2'>
										${courseData.fullPrice}
									</span>
								</div>
								<button className='w-full bg-purple-600 text-white py-2 rounded-lg mb-4 hover:bg-purple-700 transition-colors'>
									Add to cart
								</button>
								<button className='w-full border border-purple-600 text-purple-600 py-2 rounded-lg mb-4 hover:bg-purple-50 transition-colors'>
									Buy now
								</button>
								<p className='text-sm text-gray-600 text-center'>
									30-day money-back guarantee
								</p>
								<div className='mt-6'>
									<h4 className='font-bold mb-2'>
										Course includes:
									</h4>
									<ul className='space-y-2 text-sm text-gray-600'>
										<li className='flex items-center'>
											<Play className='w-4 h-4 mr-2 text-gray-400' />
											56 hours on-demand video
										</li>
										<li className='flex items-center'>
											<Star className='w-4 h-4 mr-2 text-gray-400' />
											6 Articles
										</li>
										<li className='flex items-center'>
											<ShoppingCart className='w-4 h-4 mr-2 text-gray-400' />
											8 Downloadable resources
										</li>
										<li className='flex items-center'>
											<Bell className='w-4 h-4 mr-2 text-gray-400' />
											Mobile version
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className='grid md:grid-cols-3 gap-8'>
							<div className='md:col-span-2'>
								<h2 className='text-xl sm:text-2xl font-bold mb-4'>
									Description
								</h2>
								<p className='text-gray-600 mb-8'>
									Welcome to the exciting world of Blender 3D!
									In this comprehensive course, we will dive
									into the fundamentals of Blender, equipping
									you with the essential knowledge and skills
									to create stunning 3D projects. Whether
									you're a beginner eager to explore the realm
									of 3D modeling or an experienced artist
									looking to expand your capabilities, this
									course will guide you every step of the way.
								</p>
								<h2 className='text-xl sm:text-2xl font-bold mb-4'>
									Course details
								</h2>
								<div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8'>
									<div>
										<h3 className='font-semibold mb-2'>
											Lessons
										</h3>
										<p className='flex items-center text-gray-600'>
											<Play className='w-4 h-4 mr-2 text-gray-400' />
											{courseData.lessons}
										</p>
									</div>
									<div>
										<h3 className='font-semibold mb-2'>
											Duration
										</h3>
										<p className='flex items-center text-gray-600'>
											<Bell className='w-4 h-4 mr-2 text-gray-400' />
											{courseData.duration}
										</p>
									</div>
									<div>
										<h3 className='font-semibold mb-2'>
											Skill level
										</h3>
										<p className='flex items-center text-gray-600'>
											<Star className='w-4 h-4 mr-2 text-gray-400' />
											{courseData.level}
										</p>
									</div>
								</div>
								<h2 className='text-xl sm:text-2xl font-bold mb-4'>
									Publisher
								</h2>
								<div className='bg-gray-100 rounded-lg p-4 mb-8'>
									<div className='flex items-center mb-4'>
										<img
											src={courseData.publisher.image}
											alt={courseData.publisher.name}
											className='w-16 h-16 rounded-full mr-4'
										/>
										<div>
											<h3 className='font-bold text-lg'>
												{courseData.publisher.name}
											</h3>
											<p className='text-gray-600'>
												{courseData.publisher.role}
											</p>
										</div>
									</div>
									<p className='text-gray-600 mb-4'>
										Hey! My name is Ryan. I'm 26 years old
										and I'm a freelance 3D Artist with
										around 8 years of experience.
									</p>
									<div className='grid grid-cols-2 gap-4 text-sm'>
										<div>
											<p className='font-semibold'>
												{courseData.publisher.rating}{' '}
												Instructor Rating
											</p>
											<p>
												{courseData.publisher.reviews}{' '}
												Reviews
											</p>
										</div>
										<div>
											<p className='font-semibold'>
												{courseData.publisher.students}{' '}
												Students
											</p>
											<p>
												{courseData.publisher.courses}{' '}
												Courses
											</p>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div>
									<h2 className='text-xl sm:text-2xl font-bold mb-4'>
										Suggested courses
									</h2>
									<div className='space-y-4'>
										{courseData.suggestedCourses.map(
											(course, index) => (
												<div
													key={index}
													className='flex items-center space-x-4 bg-gray-100 rounded-lg p-4'>
													<img
														src={course.image}
														alt={course.title}
														className='w-20 h-20 object-cover rounded'
													/>
													<div>
														<h3 className='font-bold'>
															{course.title}
														</h3>
														<p className='text-sm text-gray-600'>
															By {course.author}
														</p>
														<div className='flex items-center mt-1'>
															<Star className='w-4 h-4 text-yellow-400 mr-1' />
															<span className='text-sm'>
																{course.rating}
															</span>
														</div>
													</div>
												</div>
											),
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}

export default Component
