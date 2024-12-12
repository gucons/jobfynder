import prisma from "@/lib/prisma";
import JobSchema from "@/schema/JobSchema";
import handleRouteWithAuth from "@/server/handle-auth-route";
import handleRoute from "@/server/handle-route";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/server/handle-route-response";
import { JobStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = handleRouteWithAuth(async (req, session) => {
  const rawData = await req.json();

  // Validate the input data
  const data = JobSchema.parse(rawData);

  // Get user profile and recuritor attached to the user
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      recruiterProfile: true,
    },
  });

  if (!user?.recruiterProfile)
    return sendErrorResponse({
      message: "Only recruiters can post jobs",
      status: 403,
    });

  const job = await prisma.jobPosting.create({
    data: {
      recruiterId: user.recruiterProfile.id,
      ...data,
      status: JobStatus.OPEN,
    },
  });

  return sendSuccessResponse({
    message: "Job posted successfully",
    data: job,
  });
});

export const GET = handleRoute(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const recruiterId = searchParams.get("recruiterId");

  try {
    const jobs = await prisma.jobPosting.findMany({
      where: recruiterId ? { recruiterId } : undefined,
      orderBy: { dateOfPosting: "desc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
});